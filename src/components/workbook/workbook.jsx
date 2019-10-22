import React, { Component } from 'react'
import readXlsxFile from 'read-excel-file'

class Workbook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      headers: null,
      body: null
    }
  }

  handleSubmit = async e => {
    e.preventDefault()

    const file = e.target.file.files[0]

    if(!file) return

    const rows = await readXlsxFile(file)

    console.log("Objeto completo: ", rows)

    const headers = rows[0]

    let array = []

    console.log("Objetos formatados: ")

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      let obj = {}

      for (let j = 0; j < headers.length; j++) {
        obj = { 
          ...obj, 
          [headers[j]]: row[j] 
        }
      }

      console.log(obj)
      array.push(obj)
    }

    this.setState({
      ...this.state,
      headers,
      body: array
    })
  }

  renderHeader = () => {
    const headers = this.state.headers || []

    return (
      <tr>
        {headers.map((header, i) => <th key={i}>{header}</th>)}
      </tr>
    )
  }

  renderBody = () => {
    const data = this.state.body || []

    return data.map((obj, i) => {
      return (
        <tr key={i}>
          {
            Object.keys(obj).map((column, j) => {
              return (
                <td key={j}>{obj[column]}</td>
              )
            })
          }
        </tr>
      )
    })
  }

  render() {
    return (
      <div>
        <h4>Upload de arquivos excel</h4>
        <br/>
        <p>Selecione um arquivo excel que segue o formato:</p>
        <ul>
          <li><b>1º linha: </b> Cabeçalho</li>
          <li><b>2º linha: </b> Corpo da tabela</li>
        </ul>
        <p>A biblioteca irá então ler a planilha e converter para JSON</p>
        <form onSubmit={this.handleSubmit}>
          <input type="file" name="file" id="file"/>
          <br/>
          <button type="submit">enviar</button>
        </form>

        {
          this.state.body ? (
            <React.Fragment>
              <table border="1">
                <thead>
                  {this.renderHeader()}
                </thead>
                <tbody>
                  {this.renderBody()}
                </tbody>
              </table>
            </React.Fragment>
          ) : null
        }
      </div>
    )
  }
}

export default Workbook
