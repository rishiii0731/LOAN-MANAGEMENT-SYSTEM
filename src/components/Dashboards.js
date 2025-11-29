// All Dashboard Components for the Loan Management System
import React, { useState } from 'react';
import { InterestCalculator, TransactionRecords } from './AllComponents';

// Admin Dashboard - User Management and Platform Operations
export function AdminDashboard({ user, onLogout }) {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', role: 'lender', status: 'active' },
    { id: 2, name: 'Jane Smith', role: 'borrower', status: 'active' },
  ]);

  return (
    <div className="dashboard">
      <header>
        <h1>Admin Dashboard</h1>
        <p>Welcome, {user.username}</p>
        <button onClick={onLogout}>Logout</button>
      </header>
      
      <section>
        <h2>User Management</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.role}</td>
                <td>{u.status}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Platform Statistics</h2>
        <div className="stats">
          <div>Total Users: {users.length}</div>
          <div>Active Loans: 15</div>
          <div>Total Revenue: $50,000</div>
        </div>
      </section>
    </div>
  );
}

// Lender Dashboard - Create Loan Offers and Track Payments
export function LenderDashboard({ user, onLogout }) {
  const [loans, setLoans] = useState([
    { id: 1, borrower: 'Jane Smith', amount: 5000, rate: 5.5, status: 'active' },
  ]);

  const [newLoan, setNewLoan] = useState({ amount: '', rate: '', duration: '' });

  const createLoan = () => {
    if (newLoan.amount && newLoan.rate && newLoan.duration) {
      const loan = {
        id: loans.length + 1,
        amount: parseFloat(newLoan.amount),
        rate: parseFloat(newLoan.rate),
        duration: newLoan.duration,
        status: 'pending'
      };
      setLoans([...loans, loan]);
      setNewLoan({ amount: '', rate: '', duration: '' });
    }
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Lender Dashboard</h1>
        <p>Welcome, {user.username}</p>
        <button onClick={onLogout}>Logout</button>
      </header>

      <section>
        <h2>Create Loan Offer</h2>
        <div>
          <input
            type="number"
            placeholder="Amount"
            value={newLoan.amount}
            onChange={(e) => setNewLoan({...newLoan, amount: e.target.value})}
          />
          <input
            type="number"
            placeholder="Interest Rate (%)"
            value={newLoan.rate}
            onChange={(e) => setNewLoan({...newLoan, rate: e.target.value})}
          />
          <input
            type="number"
            placeholder="Duration (months)"
            value={newLoan.duration}
            onChange={(e) => setNewLoan({...newLoan, duration: e.target.value})}
          />
          <button onClick={createLoan}>Create Offer</button>
        </div>
      </section>

      <section>
        <h2>My Loans</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Borrower</th>
              <th>Amount</th>
              <th>Rate</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loans.map(loan => (
              <tr key={loan.id}>
                <td>{loan.id}</td>
                <td>{loan.borrower || 'N/A'}</td>
                <td>${loan.amount}</td>
                <td>{loan.rate}%</td>
                <td>{loan.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <InterestCalculator />
    </div>
  );
}

// Borrower Dashboard - Apply for Loans and Manage Payment Schedules
export function BorrowerDashboard({ user, onLogout }) {
  const [applications, setApplications] = useState([]);
  const [loanApp, setLoanApp] = useState({ amount: '', purpose: '', duration: '' });
  
  const [paymentSchedule] = useState([
    { date: '2025-01-15', amount: 500, status: 'paid' },
    { date: '2025-02-15', amount: 500, status: 'pending' },
    { date: '2025-03-15', amount: 500, status: 'upcoming' },
  ]);

  const applyForLoan = () => {
    if (loanApp.amount && loanApp.purpose && loanApp.duration) {
      const application = {
        id: applications.length + 1,
        ...loanApp,
        status: 'pending',
        appliedDate: new Date().toLocaleDateString()
      };
      setApplications([...applications, application]);
      setLoanApp({ amount: '', purpose: '', duration: '' });
    }
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Borrower Dashboard</h1>
        <p>Welcome, {user.username}</p>
        <button onClick={onLogout}>Logout</button>
      </header>

      <section>
        <h2>Apply for Loan</h2>
        <div>
          <input
            type="number"
            placeholder="Loan Amount"
            value={loanApp.amount}
            onChange={(e) => setLoanApp({...loanApp, amount: e.target.value})}
          />
          <input
            type="text"
            placeholder="Purpose"
            value={loanApp.purpose}
            onChange={(e) => setLoanApp({...loanApp, purpose: e.target.value})}
          />
          <input
            type="number"
            placeholder="Duration (months)"
            value={loanApp.duration}
            onChange={(e) => setLoanApp({...loanApp, duration: e.target.value})}
          />
          <button onClick={applyForLoan}>Submit Application</button>
        </div>
      </section>

      <section>
        <h2>My Applications</h2>
        {applications.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Amount</th>
                <th>Purpose</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Applied Date</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app.id}>
                  <td>{app.id}</td>
                  <td>${app.amount}</td>
                  <td>{app.purpose}</td>
                  <td>{app.duration} months</td>
                  <td>{app.status}</td>
                  <td>{app.appliedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No applications yet</p>
        )}
      </section>

      <section>
        <h2>Payment Schedule</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentSchedule.map((payment, idx) => (
              <tr key={idx}>
                <td>{payment.date}</td>
                <td>${payment.amount}</td>
                <td>{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <InterestCalculator />
    </div>
  );
}

// Financial Analyst Dashboard - Analyze Loan Data and Generate Reports
export function FinancialAnalystDashboard({ user, onLogout }) {
  const [reports] = useState([
    { id: 1, title: 'Q4 Loan Performance', date: '2024-12-01', type: 'performance' },
    { id: 2, title: 'Risk Assessment Report', date: '2024-11-15', type: 'risk' },
  ]);

  const [loanMetrics] = useState({
    totalLoans: 150,
    activeLoans: 120,
    defaultRate: 2.5,
    avgInterestRate: 6.2,
    totalRevenue: 500000
  });

  const transactions = [
    { date: '2025-01-15', type: 'Payment', amount: 5000, status: 'Completed' },
    { date: '2025-01-10', type: 'Disbursement', amount: 10000, status: 'Completed' },
    { date: '2025-01-05', type: 'Payment', amount: 2500, status: 'Pending' },
  ];

  return (
    <div className="dashboard">
      <header>
        <h1>Financial Analyst Dashboard</h1>
        <p>Welcome, {user.username}</p>
        <button onClick={onLogout}>Logout</button>
      </header>

      <section>
        <h2>Loan Metrics</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <h3>Total Loans</h3>
            <p>{loanMetrics.totalLoans}</p>
          </div>
          <div className="metric-card">
            <h3>Active Loans</h3>
            <p>{loanMetrics.activeLoans}</p>
          </div>
          <div className="metric-card">
            <h3>Default Rate</h3>
            <p>{loanMetrics.defaultRate}%</p>
          </div>
          <div className="metric-card">
            <h3>Avg Interest Rate</h3>
            <p>{loanMetrics.avgInterestRate}%</p>
          </div>
          <div className="metric-card">
            <h3>Total Revenue</h3>
            <p>${loanMetrics.totalRevenue.toLocaleString()}</p>
          </div>
        </div>
      </section>

      <section>
        <h2>Financial Reports</h2>
        <table>
          <thead>
            <tr>
              <th>Report Title</th>
              <th>Date</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report.id}>
                <td>{report.title}</td>
                <td>{report.date}</td>
                <td>{report.type}</td>
                <td>
                  <button>View</button>
                  <button>Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <TransactionRecords transactions={transactions} />
      
      <section>
        <h2>Risk Analysis</h2>
        <div>
          <p>High-risk loans: 5</p>
          <p>Medium-risk loans: 20</p>
          <p>Low-risk loans: 95</p>
        </div>
      </section>
    </div>
  );
}
