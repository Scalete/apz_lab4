"use client";

import React, { useState } from "react";
import {
  FullReport,
  ShortReport,
  FilteredReport,
} from "@/components/ReportTemplate";
import "bootstrap/dist/css/bootstrap.min.css";

const initialData = [
  { id: 1, model: "Toyota Camry", license: "ABC-123" },
  { id: 2, model: "Honda Accord", license: "XYZ-789" },
  { id: 3, model: "Ford Focus", license: "DEF-456" },
];

const ReportTable = () => {
  const [data] = useState(initialData);
  const [report, setReport] = useState("");
  const [filter, setFilter] = useState("");

  const generateFullReport = () => {
    const fullReport = new FullReport(data);
    setReport(fullReport.generateReport());
  };

  const generateShortReport = () => {
    const shortReport = new ShortReport(data);
    setReport(shortReport.generateReport());
  };

  const generateFilteredReport = () => {
    const filteredReport = new FilteredReport(data, filter);
    setReport(filteredReport.generateReport());
  };

  return (
    <div className="container mt-4">
      <h2>Система управління автопарком</h2>
      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Модель</th>
            <th>Номерний знак</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.model}</td>
              <td>{item.license}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mb-3">
        <button className="btn btn-primary me-2" onClick={generateFullReport}>
          Повний звіт
        </button>
        <button
          className="btn btn-secondary me-2"
          onClick={generateShortReport}
        >
          Скорочений звіт
        </button>
        <input
          type="text"
          placeholder="Фільтр за моделлю"
          className="form-control mb-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button
          className="btn btn-success me-2"
          onClick={generateFilteredReport}
        >
          Повний звіт із фільтром
        </button>
      </div>

      {report && (
        <pre
          className="border p-3 bg-light mt-3"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {report}
        </pre>
      )}
    </div>
  );
};

export default ReportTable;
