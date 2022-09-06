#include "pch.h"
#include "handler.h"

using namespace concurrency::streams;

HttpHandler::HttpHandler(const utility::string_t uri, TVTest::CTVTestApp *app) : listener(uri), app(app) {
    listener.support(methods::GET, [this](auto&& message) {
        handle_get(message);
    });
    listener.support(methods::POST, [this](auto&& message) {
        handle_post(message);
    });
}

static void handle_error(const http_request &message, const pplx::task<void> &task) {
    try {
        task.get();
    }
    catch (pplx::task_canceled &) {
        message.reply(status_codes::InternalError, L"Internal Server Error");
    }
}

void HttpHandler::handle_get(const http_request &message) {
    const auto path = uri::decode(message.relative_uri().path());

    if (path == L"/") {
        const auto fileTask = fstream::open_istream(L"RemoteController/index.html", std::ios::in);
        fileTask.then([message](const istream &stream) {
            message.reply(status_codes::OK, stream, L"text/html");
        });

        fileTask.wait();
    } else if (path == L"/script.js") {

    } else if (path == L"/api/volume") {
        app->GetVolume();
        web::json::value(volume);
    } else {
        message.reply(status_codes::NotFound);
    }
}

void HttpHandler::handle_post(const http_request &message) {
    const auto path = uri::decode(message.relative_uri().path());

    if (path == L"/api/volume") {
        app->SetVolume(0);
        message.reply(status_codes::OK);
    } else {
        message.reply(status_codes::NotFound);
    }
}
