const pdf = require('pdf-creator-node')
const fs = require('fs')
const path = require('path')

async function createSummaryPdf ({ data, templateSource }) {
  try {
    const htmlTemplate = fs.readFileSync(templateSource, 'utf8')
    const options = {
      format: 'A4',
      orientation: 'portrait',
      border: '15mm'
    }

    const document = {
      html: htmlTemplate,
      data,
      path: 'temp/output.pdf'
    }

    const { filename } = await pdf.create(document, options)

    const buffer = fs.readFileSync(filename)
    fs.unlink(filename, () => {})
    return buffer
  } catch (err) {
    console.log(err)
    throw err
  }
}

module.exports = {
  createSummaryPdf
}
