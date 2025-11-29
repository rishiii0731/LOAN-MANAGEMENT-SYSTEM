// This file contains all reusable components for the Loan Management System
import React, { useState } from 'react';

// Login Component
export function Login({ onLogin }) {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role && username) {
      onLogin({ role, username });
    }
  };

  return (
    <div className="login-container">
      <h2>Loan Management System Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Select Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">Choose Role</option>
            <option value="admin">Admin</option>
            <option value="lender">Lender</option>
            <option value="borrower">Borrower</option>
            <option value="analyst">Financial Analyst</option>
          </select>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

// Interest Calculator Component
export function InterestCalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [interest, setInterest] = useState(null);

  const calculateInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);
    const simpleInterest = (p * r * t) / 100;
    setInterest(simpleInterest.toFixed(2));
  };

  return (
    <div className="interest-calculator">
      <h3>Interest Calculator</h3>
      <input
        type="number"
        placeholder="Principal Amount"
        value={principal}
        onChange={(e) => setPrincipal(e.target.value)}
      />
      <input
        type="number"
        placeholder="Rate (%)"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
      />
      <input
        type="number"
        placeholder="Time (years)"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button onClick={calculateInterest}>Calculate</button>
      {interest && <p>Interest: ${interest}</p>}
    </div>
  );
}

// Transaction Records Component
export function TransactionRecords({ transactions }) {
  return (
    <div className="transaction-records">
      <h3>Transaction Records</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn, index) => (
            <key={index}>
              <td>{txn.date}</td>
              <td>{txn.type}</td>
              <td>${txn.amount}</td>
              <td>{txn.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
