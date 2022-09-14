#include "pch.h"
#include "handler.h"

HttpHandler::HttpHandler(const utility::string_t uri, TVTest::CTVTestApp *app) : listener(uri), app(app) {
    listener.support(methods::GET, [this](auto &&message) {
        try {
            const auto path = uri::decode(message.relative_uri().path());
            handle_get(message, path);
        } catch (...) {
            message.reply(status_codes::InternalError);
        }
    });

    listener.support(methods::POST, [this](auto &&message) {
        try {
            const auto path = uri::decode(message.relative_uri().path());
            const auto payload = message.extract_json().get();
            handle_post(message, path, payload);
        } catch (...) {
            message.reply(status_codes::InternalError);
        }
    });
}

static void
reply_file(const http_request &message, const utility::string_t &filename, const utility::string_t &content_type) {
    try {
        const auto stream = fstream::open_istream(filename, std::ios::in).get();
        message.reply(status_codes::OK, stream, content_type);
    } catch (...) {
        message.reply(status_codes::InternalError);
    }
}

static void
reply_json(const http_request &message, const std::vector<std::pair<utility::string_t, json::value>> &pairs) {
    try {
        const auto object = json::value::object(pairs, true);
        message.reply(status_codes::OK, object.serialize(), L"application/json");
    } catch (...) {
        message.reply(status_codes::InternalError);
    }
}

void HttpHandler::handle_get(const http_request &message, const utility::string_t &path) {
    if (path == L"/") {
        reply_file(message, L"Plugins/RemoteController/index.html", L"text/html");
    } else if (path == L"/app.js") {
        reply_file(message, L"Plugins/RemoteController/app.js", L"text/javascript");
    } else if (path == L"/api/volume") {
        reply_json(message, {
            std::pair(L"volume", json::value::number(app->GetVolume()))
        });
    } else {
        message.reply(status_codes::NotFound);
    }
}

void HttpHandler::handle_post(const http_request &message, const utility::string_t &path, const json::value &payload) {
    if (path == L"/api/volume") {
        const auto volume = payload.at(L"volume").as_integer();
        app->SetVolume(volume);
        message.reply(status_codes::OK);
    } else {
        message.reply(status_codes::NotFound);
    }
}
