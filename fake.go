
package main

import (
    "log"
    "fmt"
    "net/http"
    "math/rand"
    "encoding/json"
    "github.com/gorilla/mux"
)

const (
    PORT = 3862
    ONITU_API_BASE = "/api/v1.0"

    RAND_SEED = 424242

    MAX_FILES = 50
    MAX_LENGTH_FILENAME = 32

    MAX_LENGTH_DRIVERNAME = 20
    MAX_LENGTH_DRIVERPATH = 64
)

var (
    // Use a static seed to be able to reproduce eventual bugs induced by randomly generated strings
    RND = rand.New(rand.NewSource(RAND_SEED))
    ENTRIES = []OnituEntry {
        "amazon_s3",
        "local_storage",
    }
)

type OnituFakeRouter struct {
    r *mux.Router
}

type OnituEntry string

type File struct {
    Fid string `json:"fid"`
    Filename string `json:"filename"`
    Size int `json:"size"`
    Owners []OnituEntry `json:"owners"`
    Uptodate []OnituEntry `json:"uptodate"`
}

type Driver struct {
    Name string `json:"name"`
    Driver OnituEntry `json:"driver"`
    Options map[string] string `json:"options"`
}

type DriverStats struct {
    Age float64 `json:"age"`
    Cpu float64 `json:"cpu"`
    CreateTime float64 `json:"create_time"`
    CTime string `json:"ctime"`
    Mem float64 `json:"mem"`
    MemInfo1 string `json:"mem_info1"`
    MemInfo2 string `json:"mem_info2"`
    Started float64 `json:"started"`
}

func rand_intnn(from, to int) int {
    return rand.Int() % (to - from) + from
}

func rand_string(length int) string {
    s := make([]byte, length)

    for i := 0; i < length; i++ {
        s[i] = (byte)(rand_intnn(33, 126))
    }

    return (string)(s)
}

func rand_float64() float64 {
    return RND.Float64() * float64(RND.Intn(99999999))
}

func rand_fileowner_array() []OnituEntry {
    n_owners := RND.Intn(len(ENTRIES))
    s := make([]OnituEntry, n_owners)

    for i := 0; i < n_owners; i++ {
        // Pick a random owner in the ENTRIES slice ?
        s[i] = ENTRIES[i]
    }

    return s
}

func (s *OnituFakeRouter) ServeHTTP(rw http.ResponseWriter, req *http.Request) {
    if origin := req.Header.Get("Origin"); origin != "" {
        rw.Header().Set("Access-Control-Allow-Origin", origin)
        rw.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
        rw.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
    }

    if req.Method == "OPTIONS" {
        return
    }

    s.r.ServeHTTP(rw, req)
}

func handler_write_resp(w http.ResponseWriter, v interface{}) {
    // Output indented JSON to allow better visualization of the data generated
    if b, err := json.MarshalIndent(v, "", "\t"); err == nil {
        fmt.Fprintf(w, "%s", b)
    } else {
        log.Fatal(err)
    }
}

func HandlerFile(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)

    log.Printf("/files/id/%s", vars["name"])
}

func HandlerFiles(w http.ResponseWriter, r *http.Request) {
    n_files := RND.Intn(MAX_FILES)
    files := map[string] []File {
        "files": make([]File, n_files),
    }

    log.Print("/files")

    for i := 0; i < n_files; i++ {
        files["files"][i] = File{
            Fid: rand_string(36),
            Filename: rand_string(RND.Intn(MAX_LENGTH_FILENAME - 1) + 1),
            Size: RND.Intn(999999999999),
            Owners: rand_fileowner_array(),
            Uptodate: rand_fileowner_array(),
        }
    }

    handler_write_resp(w, files)
}

func HandlerFileMetadata(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)

    log.Printf("/files/%s/metadata", vars["fid"])
}

func HandlerEntries(w http.ResponseWriter, r *http.Request) {
    n_entries := RND.Intn(len(ENTRIES))
    entries := map[string] []Driver {
        "entries": make([]Driver, n_entries),
    }

    log.Print("/entries")

    for i := 0; i < n_entries; i++ {
        entries["entries"][i] = Driver{
            Name: rand_string(RND.Intn(MAX_LENGTH_DRIVERNAME - 1) + 1),
            Driver: ENTRIES[i],
            Options: map[string] string {
                "root": rand_string(MAX_LENGTH_DRIVERPATH),
            },
        }
    }

    handler_write_resp(w, entries)
}

func HandlerEntry(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    entry := Driver{
        Name: rand_string(RND.Intn(MAX_LENGTH_DRIVERNAME - 1) + 1),
        Driver: ENTRIES[RND.Intn(len(ENTRIES))],
        Options: map[string] string {
            "root": rand_string(MAX_LENGTH_DRIVERPATH),
        },
    }

    log.Printf("/entries/%s", vars["name"])

    handler_write_resp(w, entry)
}

func HandlerEntryStats(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    stats := struct {
        Info DriverStats `json:"info"`
        Name string `json:"name"`
        Status string `json:"status"`
        Time float64 `json:"time"`
    }{
        Info: DriverStats{
            Age: rand_float64(),
            Cpu: rand_float64(),
            CreateTime: rand_float64(),
            CTime: fmt.Sprintf("%d:%g", RND.Intn(42), rand_float64()),
            Mem: rand_float64(),
            MemInfo1: fmt.Sprintf("%dM", RND.Intn(99999)),
            MemInfo2: fmt.Sprintf("%dM", RND.Intn(99999)),
            Started: rand_float64(),
        },
        Name: rand_string(RND.Intn(MAX_LENGTH_DRIVERNAME - 1) + 1),
        Status: "ok",
        Time: RND.Float64() * float64(RND.Intn(99999999)),
    }

    log.Printf("/entries/%s/stats", vars["name"])

    handler_write_resp(w, stats)
}

func HandlerEntryStatus(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)

    log.Printf("/entries/%s/status", vars["name"])
}

func HandlerEntryStart(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)

    log.Printf("/entries/%s/start", vars["name"])
}

func HandlerEntryStop(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)

    log.Printf("/entries/%s/stop", vars["name"])
}

func HandlerEntryRestart(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)

    log.Printf("/entries/%s/restart", vars["name"])
}

func main() {
    onitu_api := map[string] struct {
        method string
        handler func (http.ResponseWriter, *http.Request)
    }{
        "/files/id/{name}": {method: "GET", handler: HandlerFile},
        "/files": {method: "GET", handler: HandlerFiles},
        "/files/{fid}/metadata": {method: "GET", handler: HandlerFileMetadata},
        "/entries": {method: "GET", handler: HandlerEntries},
        "/entries/{name}": {method: "GET", handler: HandlerEntry},
        "/entries/{name}/stats": {method: "GET", handler: HandlerEntryStats},
        "/entries/{name}/status": {method: "GET", handler: HandlerEntryStatus},
        "/entries/{name}/start": {method: "PUT", handler: HandlerEntryStart},
        "/entries/{name}/stop": {method: "PUT", handler: HandlerEntryStop},
        "/entries/{name}/restart": {method: "PUT", handler: HandlerEntryRestart},
    }

    log.Printf("Starting the fake onitu server on port %d\n", PORT)

    router := mux.NewRouter()

    for path, s := range onitu_api {
        router.HandleFunc(fmt.Sprintf("%s%s", ONITU_API_BASE, path), s.handler).Methods(s.method)
    }

    http.Handle("/", &OnituFakeRouter{r: router})

    http.ListenAndServe(fmt.Sprintf(":%d", PORT), nil)
}
