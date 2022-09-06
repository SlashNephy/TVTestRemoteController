#include <future>
#include "pch.h"

using namespace web::http;
using namespace web::http::experimental::listener;

class HttpHandler {
public:
    HttpHandler(utility::string_t uri, TVTest::CTVTestApp *app);

    pplx::task<void> open() {
        return listener.open();
    }

    pplx::task<void> close() {
        return listener.close();
    }

private:
    http_listener listener;
    TVTest::CTVTestApp *app;

    void handle_get(const http_request &message);

    void handle_post(const http_request &message);
};
