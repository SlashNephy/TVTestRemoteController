#include "pch.h"
#include "handler.h"

HttpHandler::HttpHandler(utility::string_t uri, TVTest::CTVTestApp* app) : listener(uri), app(app)
{
    listener.support(web::http::methods::GET, std::bind(&HttpHandler::handle_get, this, std::placeholders::_1));
    listener.support(web::http::methods::POST, std::bind(&HttpHandler::handle_post, this, std::placeholders::_1));
}

void HttpHandler::handle_get(web::http::http_request message)
{
    message.reply(web::http::status_codes::OK, "OK");
}

void HttpHandler::handle_post(web::http::http_request message)
{
    message.reply(web::http::status_codes::OK, message.to_string());
}
