# MathLab — Android e Web

## Estado
O MathLab é um protótipo educacional. A interface e 12 exercícios demonstrativos funcionam offline. O Android é empacotado com Capacitor e usa a mesma interface.

## Android
- Requisitos de build: Node.js 22, Java 21 e Android SDK.
- `npm install`, `npx cap add android`, `npx cap sync android`, `cd android && ./gradlew assembleDebug`.
- O workflow `.github/workflows/release.yml` compila `MathLab-Android-TESTE.apk` e anexa à Release. APK de testes usa chave debug efêmera e **não garante atualização por cima** de APK anterior.
- Para APK de produção atualizável, configure quatro secrets em GitHub Actions: `ANDROID_KEYSTORE_BASE64` (conteúdo base64 de um arquivo JKS persistente), `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS` e `ANDROID_KEY_PASSWORD`. Guarde o JKS original fora do repositório. O workflow produz `MathLab-Android.apk` com a mesma chave a cada versão.
- A instalação de APK baixado requer confirmação do Android; o app não instala atualizações silenciosamente.

## Atualizações
- O aplicativo consulta `version.json` no GitHub ao abrir e pelo botão de atualização.
- Quando a versão remota é superior, mostra **Atualizar agora** e **Mais tarde**. No Android, **Atualizar agora** abre a Release correspondente, onde o usuário baixa o APK assinado e confirma a instalação. A verificação requer internet; as atividades demonstrativas não.
- Para publicar uma versão, altere `version.json`, `package.json` e as constantes `MATHLAB_VERSION` nos arquivos `index.html` e `www/index.html`. Faça push na main; o workflow gera o pacote.
- Para atualizar um APK instalado sem desinstalar, é necessário preservar **o mesmo applicationId e a mesma chave de assinatura** e incrementar o `versionCode`.

## Limitações
Não há currículo completo, banco ENEM oficial, IA, sincronização de contas, avaliação adaptativa validada ou instalação automática de APK. O aplicativo Android abre a página de Release para baixar a atualização; a instalação continua sob controle do Android.

## Repositório
Este projeto é independente do SGE Diário e do Atlas. Código-fonte: https://github.com/nabikendo/MathLab
