export class ReportTemplate {
  constructor(data, filter = null) {
    this.data = data;
    this.filter = filter;
  }

  createHeader() {
    const date = new Date().toLocaleDateString();
    let header = `Звіт: ${this.reportTitle}\nДата створення: ${date}\n`;
    if (this.filter) {
      header += `Фільтр: ${this.filter}\n`;
    }
    header += "\n";
    return header;
  }

  createData() {
    throw new Error("Метод createData() має бути реалізований у підкласі");
  }

  createFooter() {
    return `\nЗвіт підготував: Студент Палагута М.Д., Група КН-222д, Університет ХПІ\n`;
  }

  generateReport() {
    return this.createHeader() + this.createData() + this.createFooter();
  }
}

export class FullReport extends ReportTemplate {
  reportTitle = "Повний звіт";

  createData() {
    let result = "ID\tМодель\tНомерний знак\n";
    result += this.data
      .map((item) => `${item.id}\t${item.model}\t${item.license}`)
      .join("\n");
    return result;
  }
}

export class ShortReport extends ReportTemplate {
  reportTitle = "Скорочений звіт";

  createData() {
    let result = "ID\tМодель\n";
    result += this.data.map((item) => `${item.id}\t${item.model}`).join("\n");
    return result;
  }
}

export class FilteredReport extends ReportTemplate {
  reportTitle = "Повний звіт із фільтром";

  createData() {
    const filteredData = this.data.filter((item) =>
      item.model.includes(this.filter)
    );
    let result = "ID\tМодель\tНомерний знак\n";
    result += filteredData
      .map((item) => `${item.id}\t${item.model}\t${item.license}`)
      .join("\n");
    return result;
  }
}
