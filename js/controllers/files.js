/*
 * files.js for onitu
 * by lenorm_f
 */

"use strict";

facetControllers.controller("filesListCtrl", [ "$scope", "$http", "$routeParams", "Restangular",
	function ($scope, $http, $rp, Restangular) {
        var filter_array = function (files, type) {
            var ret = [];

            $.each(files, function (_, file) {
                if (file.type === type) {
                    ret.push(file);
                }
            });

            return ret;
        }
        var assign_filetypes = function (files) {
            var ext_ref = {
                "file": [
                    "application/x-dvi",
                    "application/x-font-ttf",
                    "application/x-shockwave-flash",
                    "application/x-www-form-urlencoded",
                    "text/x-gwt-rpc",
                    "application/x-pkcs12",
                    "application/vnd.google-earth.kml+xml",
                    "application/vnd.google-earth.kmz",
                    "application/x-www-form-urlencoded",
                    "model/iges",
                    "model/mesh",
                    "model/vrml",
                    "model/x3d+binary",
                    "model/x3d+fastinfoset",
                    "model/x3d-vrml",
                    "application/dart",
                    "application/EDI-X12",
                    "application/EDIFACT",
                    "application/octet-stream",
                    "application/postscript",
                    "application/font-woff",
                    "application/x-nacl",
                    "application/x-pnacl",
                ],
                "archive": [
                    "application/x-7z-compressed",
                    "application/x-chrome-extension",
                    "application/x-rar-compressed",
                    "application/x-stuffit",
                    "application/x-tar",
                    "application/x-xpinstall",
                    "application/vnd.debian.binary-package",
                    "application/vnd.android.package-archive",
                    "application/zip",
                    "application/gzip",
                ],
                "audio": [
                    "audio/basic",
                    "audio/L24",
                    "audio/mp4",
                    "audio/mpeg",
                    "audio/ogg",
                    "application/ogg",
                    "audio/opus",
                    "audio/vorbis",
                    "audio/vnd.rn-realaudio",
                    "audio/vnd.wave",
                    "audio/webm",
                    "audio/x-aac",
                    "audio/x-caf",
                ],
                "code": [
                    "application/x-javascript",
                    "application/x-latex",
                    "text/cmd",
                    "text/css",
                    "text/html",
                    "text/javascript",
                    "text/x-jquery-tmpl",
                    "text/x-markdown",
                    "application/vnd.mozilla.xul+xml",
                    "application/ecmascript",
                    "application/javascript",
                ],
                "excel": [
                    "application/vnd.oasis.opendocument.spreadsheet",
                    "application/vnd.ms-excel",
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                ],
                "image": [
                    "image/gif",
                    "image/jpeg",
                    "image/pjpeg",
                    "image/png",
                    "image/svg+xml",
                    "image/vnd.djvu",
                    "image/x-xcf",
                    "application/vnd.oasis.opendocument.graphics",
                ],
                "pdf": [
                    "application/pdf",
                ],
                "powerpoint": [
                    "application/vnd.oasis.opendocument.presentation",
                    "application/vnd.ms-powerpoint",
                    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                ],
                "text": [
                    "text/csv",
                    "text/plain",
                    "text/rtf",
                    "text/vcard",
                    "text/vnd.abc",
                    "text/xml",
                    "text/vnd.abc",
                    "model/x3d+xml",
                    "application/atom+xml",
                    "application/json",
                    "application/rdf+xml",
                    "application/rss+xml",
                    "application/soap+xml",
                    "application/xhtml+xml",
                    "application/xml",
                    "application/xml-dtd",
                    "application/xop+xml",
                ],
                "video": [
                    "video/avi",
                    "video/mpeg",
                    "video/mp4",
                    "video/ogg",
                    "video/quicktime",
                    "video/webm",
                    "video/x-matroska",
                    "video/x-ms-wmv",
                    "video/x-flv",
                ],
                "word": [
                    "application/vnd.oasis.opendocument.text",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    "application/vnd.ms-xpsdocument",
                ],
            }

            $.each(files, function (_, file) {
                file.type = "file";

                $.each(ext_ref, function (type, mime_a) {
                    var idx = mime_a.lastIndexOf(file.mimetype);

                    if (idx > -1) {
                        file.type = type;
                        return false;
                    }

                    return true;
                });
            });

            return files;
        }

        Restangular.one("files").get().then(function (files) {
            var files = assign_filetypes(files.files);

            // FIXME: ask the server not to return all the files ?
            var file_type = ($rp.hasOwnProperty("type") ? $rp.type : undefined);
            if (file_type !== undefined) {
                files = filter_array(files, file_type);
            } else {
                files = files;
            }

            $scope.files = files.sort(function (a, b) {
                // FIXME
                return 0;
            });
        });


        $scope.fileTypeToAwesomeClass = function (filetype) {
            // FIXME: check file type
            return {
                "file": "fa-file-o",
                "archive": "fa-file-archive-o",
                "audio": "fa-file-audio-o",
                "code": "fa-file-code-o",
                "excel": "fa-file-excel-o",
                "image": "fa-file-image-o",
                "pdf": "fa-file-pdf-o",
                "powerpoint": "fa-file-powerpoint-o",
                "text": "fa-file-text-o",
                "video": "fa-file-video-o",
                "word": "fa-file-word-o",
            }[filetype.toLowerCase()];
        }
	}
]);
