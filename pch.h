#ifndef PCH_H
#define PCH_H

#define WIN32_LEAN_AND_MEAN
#include <windows.h>

#include <shellapi.h>

#include <format>
#include <vector>
#include <iostream>
#include <fstream>

#include <cpprest/http_listener.h>
#include <cpprest/http_msg.h>
#include <cpprest/filestream.h>

#define TVTEST_PLUGIN_CLASS_IMPLEMENT
#include <TVTestPlugin.h>

using namespace web;
using namespace web::http;
using namespace web::http::experimental::listener;
using namespace concurrency::streams;

#endif
