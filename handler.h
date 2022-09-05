#include "pch.h"

class HttpHandler
{
public:
    HttpHandler(utility::string_t uri, TVTest::CTVTestApp* app);
    
    pplx::task<void> open()
    {
        return listener.open();
    }
    
    pplx::task<void> close()
    {
        return listener.close();
    }

private:
    web::http::experimental::listener::http_listener listener;
    TVTest::CTVTestApp* app;

    void handle_get(web::http::http_request message);
    void handle_post(web::http::http_request message);
};
