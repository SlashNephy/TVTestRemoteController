#include "pch.h"
#include "handler.h"

constexpr auto PORT = 3200;

class RemoteControllerPlugin final : public TVTest::CTVTestPlugin
{
private:
    std::unique_ptr<HttpHandler> handler;

public:
    DWORD GetVersion() override
    {
        // TVTest ver.0.9.0 or later
        return TVTEST_PLUGIN_VERSION_(0, 0, 14);
    }

    bool GetPluginInfo(TVTest::PluginInfo* pInfo) override
    {
        pInfo->Type = TVTest::PLUGIN_TYPE_NORMAL;
        pInfo->Flags = 0;
        pInfo->pszPluginName = L"Web ブラウザ リモコン";
        pInfo->pszCopyright = L"© 2022 SlashNephy";
        pInfo->pszDescription = L"Web ブラウザ経由のリモコンを提供するプラグインです。";

        return true;
    }

    bool Initialize() override
    {
        const auto address = std::format(L"http://127.0.0.1:{}", PORT);
        handler = std::unique_ptr<HttpHandler>(new HttpHandler(address, m_pApp));
        handler->open().wait();

        m_pApp->AddLog(std::format(L"{} にリモコンが表示されます。", address).c_str());

        return true;
    }

    bool Finalize() override
    {
        handler->close().wait();

        return true;
    }
};

TVTest::CTVTestPlugin* CreatePluginClass()
{
    return new RemoteControllerPlugin;
}
