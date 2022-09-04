#include "pch.h"

class CRemoteControllerPlugin final : public TVTest::CTVTestPlugin
{
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
        pInfo->pszPluginName = L"Remote Controller";
        pInfo->pszCopyright = L"© 2022 SlashNephy";
        pInfo->pszDescription = L"Web ブラウザ経由のリモコンを提供するプラグインです。";

        return true;
    }

    bool Initialize() override
    {
        return true;
    }

    bool Finalize() override
    {
        return true;
    }

private:
    HANDLE queue = nullptr;
    std::vector<std::wstring> urls = std::vector{
        std::wstring(L""),
    };
};
