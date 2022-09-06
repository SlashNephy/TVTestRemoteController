# TVTestRemoteController

ローカルネットワークからブラウザ経由で TVTest の操作をできるようにするプラグイン

## Development

### Plugin (C++)

ローカルでの開発では Visual Studio 2022, [microsoft/vcpkg](https://github.com/microsoft/vcpkg) が必要です。

```console
vcpkg integrate install
msbuild -m -p:Configuration="Release" -p:Platform="x64"
```

### Static (TypeScript, React)

ローカルでの開発では Node.js (>= 16), yarn が必要です。

```console
$ yarn
$ yarn dev
```

ブラウザが起動し、`http://localhost:3000` に開発サーバーが起動します。ソースの変更がある度にホットリロードされます。
