## Dictionary
<p align="left">Desafio coodesh </p>

<h2 align="left"><a href="https://reactnative.dev/">🔗 React Native</a></h2>
<p align="center">🚀 Lib para construir interfaces do usuário com componentes reutilizáveis</p>

> Nesse desafio deverá ser desenvolvolvido um aplicativo para listar palavras em inglês, utilizando como base a API Free Dictionary API. O projeto tem como objetivo exibir termos em inglês e gerenciar as palavras visualizadas, conforme indicado nos casos de uso.

# Testar aplicativo
```
Podera baixar o apk gerado pelo Expo, pelo link: <https://expo.dev/artifacts/eas/5ww1WTcWV8xzAvAej3JWQV.apk>
(Lembrar de abrir o download com o navegador, pois se for pelo expo pedirá credenciais)
```
## Requisitos para rodar localmente

```
# Yarn
# Expo
# Expo Go no aparelho (Android)
```

## Rodando o projeto
```
# Clone este repositório
$ git clone <https://github.com/niubajr19/Dictionary>
$ cd app

# Instale as dependências
$ yarn

# Execute a aplicação em modo de desenvolvimento
$ expo start

# Você poderá abrir o expo Go e escanear o QR Code na tela
```

## Credenciais para login no app
```
    teste2@gmail.com
    123456
    
    teste3@gmail.com
    123456
    
    teste4@gmail.com
    123456
```

### Tecnologias

=================

<!--ts-->
### Back-End
    Supabase (Criando bd e endPoins)
    Google Sheets (manipulação dos dados e exportação de CSV)
<!--te-->
<!--ts-->
### Front-End
    - TypeScrypt
    - Expo
    - ContextAPI
    - Axios
    - Async Storage
    - Lottie
    - React Hook Form
    - Styled Component
    - Fonts
        - Poppins Bold, Poppins Regular, Poppins Medium
    - Icons
        - Expo Icons (MaterialIcons)
  <!--te-->
  
=================

### Manipulação dos dados:

- Foi necessario manipular os dados brutos no excel, inserindo assim os ids e logo após exportando como csv para separar as palavras por virgula

- Encontrou-se inconsistencias na base de dados do desafio, após contato com a organização, foi proposto uma nova base de dados: https://github.com/sindresorhus/word-list (acabou tendo o mesmo problema) - Utilizando https://www.ef.com.br/guia-de-ingles/vocabulario-ingles/3000-palavras/

#### Extras:

- Poder ver as palavras favoritadas quando abir o modal do historico

- Tela de Login

- Loading animado

- Refresh na lista se quiser atualizar (pull down)

- Salvando usuário no async Storage para não precisar fazer login se já fez

- Indicador (texto) quando a lista finalizar

- Paginação com push up da flatList

- Logout (Async Storage e context)

> This is a challenge by Coodesh
