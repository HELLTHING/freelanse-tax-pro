import React, { useState } from "react";
import "./styles.css";

export default function FreelanceTaxPro() {
  const [activeTab, setActiveTab] = useState("landing");
  const [selectedCountry, setSelectedCountry] = useState("usa");
  const [income, setIncome] = useState("50000");
  const [platform, setPlatform] = useState("upwork");
  const [language, setLanguage] = useState("en");

  const countries = {
    usa: { name: "United States", taxRate: 0.25, flag: "🇺🇸", currency: "$" },
    uk: { name: "United Kingdom", taxRate: 0.28, flag: "🇬🇧", currency: "£" },
    russia: { name: "Russia", taxRate: 0.13, flag: "🇷🇺", currency: "₽" },
    canada: { name: "Canada", taxRate: 0.30, flag: "🇨🇦", currency: "C$" },
    australia: { name: "Australia", taxRate: 0.37, flag: "🇦🇺", currency: "A$" },
    india: { name: "India", taxRate: 0.30, flag: "🇮🇳", currency: "₹" },
    philippines: { name: "Philippines", taxRate: 0.32, flag: "🇵🇭", currency: "₱" },
    eu: { name: "European Union", taxRate: 0.35, flag: "🇪🇺", currency: "€" },
  };

  const platforms = {
    upwork: { name: "Upwork", commission: 0.1 },
    fiverr: { name: "Fiverr", commission: 0.2 },
    freelancer: { name: "Freelancer", commission: 0.1 },
    guru: { name: "Guru", commission: 0.09 },
    direct: { name: "Direct Clients", commission: 0 },
  };

  const translations = {
    en: {
      title: "Freelance Tax Pro",
      subtitle: "Calculate Your Real Freelance Income",
      description: "Know exactly how much you'll earn after taxes and platform fees",
      calculateBtn: "Calculate Now",
      country: "Select Country",
      income: "Annual Income",
      platform: "Select Platform",
      results: "Your Results",
      grossIncome: "Gross Income",
      platformCommission: "Platform Commission",
      totalTaxes: "Total Taxes",
      netIncome: "Net Income",
      monthlyIncome: "Monthly Income",
      premiumFeatures: "Premium Features",
      unlock: "Unlock Premium Features",
      price: "$4.99/month",
    },
    es: {
      title: "Freelance Tax Pro",
      subtitle: "Calcula Tu Ingreso Real de Freelancer",
      description: "Sabe exactamente cuánto ganarás después de impuestos y comisiones",
      calculateBtn: "Calcular Ahora",
      country: "Seleccionar País",
      income: "Ingreso Anual",
      platform: "Seleccionar Plataforma",
      results: "Tus Resultados",
      grossIncome: "Ingreso Bruto",
      platformCommission: "Comisión de Plataforma",
      totalTaxes: "Impuestos Totales",
      netIncome: "Ingreso Neto",
      monthlyIncome: "Ingreso Mensual",
      premiumFeatures: "Características Premium",
      unlock: "Desbloquear Características Premium",
      price: "$4.99/mes",
    },
    ru: {
      title: "Freelance Tax Pro",
      subtitle: "Рассчитайте Ваш Реальный Доход Фрилансера",
      description: "Узнайте точно сколько вы заработаете после налогов и комиссий",
      calculateBtn: "Рассчитать",
      country: "Выбрать Страну",
      income: "Годовой Доход",
      platform: "Выбрать Платформу",
      results: "Ваши Результаты",
      grossIncome: "Валовой Доход",
      platformCommission: "Комиссия Платформы",
      totalTaxes: "Общие Налоги",
      netIncome: "Чистый Доход",
      monthlyIncome: "Ежемесячный Доход",
      premiumFeatures: "Премиум Функции",
      unlock: "Разблокировать Премиум",
      price: "$4.99/месяц",
    },
  };

  const t = translations[language];

  const calculateTax = () => {
    const incomeNum = parseFloat(income) || 0;
    const countryData = countries[selectedCountry];
    const platformData = platforms[platform];

    const platformCommissionAmount = incomeNum * platformData.commission;
    const afterPlatform = incomeNum - platformCommissionAmount;
    const taxes = afterPlatform * countryData.taxRate;
    const netIncome = afterPlatform - taxes;
    const monthlyNetIncome = netIncome / 12;

    return {
      grossIncome: incomeNum,
      platformCommission: platformCommissionAmount,
      afterPlatform: afterPlatform,
      taxes: taxes,
      netIncome: netIncome,
      monthlyNetIncome: monthlyNetIncome,
      taxPercentage: (taxes / afterPlatform) * 100,
      commissionPercentage: platformData.commission * 100,
    };
  };

  const renderLanding = () => {
    return (
      <div className="landing-page">
        <div className="hero">
          <h1>💰 {t.title}</h1>
          <h2>{t.subtitle}</h2>
          <p>{t.description}</p>
          <button className="cta-button" onClick={() => setActiveTab("calculator")}>
            {t.calculateBtn}
          </button>
        </div>

        <div className="features-section">
          <h2>{t.premiumFeatures}</h2>
          <div className="features-grid">
            <div className="feature"><span>🌍</span><p>Support All Countries</p></div>
            <div className="feature"><span>💡</span><p>Tax Optimization Tips</p></div>
            <div className="feature"><span>📄</span><p>PDF Reports</p></div>
            <div className="feature"><span>📊</span><p>Monthly Tracking</p></div>
          </div>
        </div>

        <div className="pricing-section">
          <h2>{t.unlock}</h2>
          <p>{t.price}</p>
          <button className="premium-button">Go Premium</button>
        </div>
      </div>
    );
  };

  const renderCalculator = () => {
    const results = calculateTax();

    return (
      <div className="calculator-page">
        <div className="calculator-container">
          <h2>{t.subtitle}</h2>

          <div className="input-section">
            <div className="input-group">
              <label>{t.country}:</label>
              <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                {Object.entries(countries).map(([key, country]) => (
                  <option key={key} value={key}>{country.flag} {country.name}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>{t.income}:</label>
              <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="50000" />
            </div>

            <div className="input-group">
              <label>{t.platform}:</label>
              <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
                {Object.entries(platforms).map(([key, plat]) => (
                  <option key={key} value={key}>{plat.name}</option>
                ))}
              </select>
            </div>

            <div className="language-selector">
              <button onClick={() => setLanguage("en")} className={language === "en" ? "active" : ""}>English</button>
              <button onClick={() => setLanguage("es")} className={language === "es" ? "active" : ""}>Español</button>
              <button onClick={() => setLanguage("ru")} className={language === "ru" ? "active" : ""}>Русский</button>
            </div>
          </div>

          <div className="results-section">
            <h3>{t.results}</h3>

            <div className="results-grid">
              <div className="result-item">
                <span>{t.grossIncome}</span>
                <strong>{countries[selectedCountry].currency}{results.grossIncome.toFixed(2)}</strong>
              </div>

              <div className="result-item commission">
                <span>{t.platformCommission}</span>
                <strong>-{countries[selectedCountry].currency}{results.platformCommission.toFixed(2)}</strong>
              </div>

              <div className="result-item taxes">
                <span>{t.totalTaxes}</span>
                <strong>-{countries[selectedCountry].currency}{results.taxes.toFixed(2)} ({results.taxPercentage.toFixed(1)}%)</strong>
              </div>

              <div className="result-item net-income">
                <span>{t.netIncome}</span>
                <strong>{countries[selectedCountry].currency}{results.netIncome.toFixed(2)}</strong>
              </div>

              <div className="result-item monthly">
                <span>{t.monthlyIncome}</span>
                <strong>{countries[selectedCountry].currency}{results.monthlyNetIncome.toFixed(2)}</strong>
              </div>
            </div>

            <div className="breakdown-chart">
              <div className="chart-bar">
                <div className="bar-segment green" style={{ width: `${(results.netIncome / results.grossIncome) * 100}%` }}></div>
                <div className="bar-segment orange" style={{ width: `${(results.taxes / results.grossIncome) * 100}%` }}></div>
                <div className="bar-segment red" style={{ width: `${(results.platformCommission / results.grossIncome) * 100}%` }}></div>
              </div>
              <div className="legend">
                <span><span className="dot green"></span>Net Income</span>
                <span><span className="dot orange"></span>Taxes</span>
                <span><span className="dot red"></span>Commission</span>
              </div>
            </div>
          </div>

          <button className="back-button" onClick={() => setActiveTab("landing")}>← Back to Home</button>
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <h1 onClick={() => setActiveTab("landing")} style={{ cursor: "pointer" }}>💰 {t.title}</h1>
        <button className="nav-button" onClick={() => setActiveTab("landing")}>Home</button>
        <button className="nav-button" onClick={() => setActiveTab("calculator")}>Calculator</button>
      </nav>

      <main className="main-content">
        {activeTab === "landing" ? renderLanding() : renderCalculator()}
      </main>

      <footer className="footer">
        <p>© 2024 Freelance Tax Pro. All rights reserved.</p>
        <p>This is a calculation tool. Consult a tax professional for personalized advice.</p>
      </footer>
    </div>
  );
}
