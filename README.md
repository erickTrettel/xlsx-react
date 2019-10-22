Leitura de planilhas Excel e/ou formato .xlsx com react

## Instalação

Para instalar a biblioteca:

### `npm i read-excel-file`

Pra rodar o projeto

### `npm start`

## Como utilizar a biblioteca?

Primeiramente, você deve fazer o upload de um arquivo no formato .xlsx através de um input:file

`<input type="file" name="file" id="file"/>`

No evento do formulário você deve receber esse arquivo:

`const file = e.target.file.files[0]`

Para fazer a leitura do arquivo, a biblioteca possui uma função assíncrona chamada readXlsxFile

`const rows = await readXlsxFile(file)`

Essa função retorna um array com as linhas do arquivo xlsx no formato JSON, que por sua vez contém as colunas
