import React, { useState } from 'react';

const App = () => {
  const [rules, setRules] = useState([
    {
      key: 'age',
      output: {
        value: '',
        operator: '>=',
        score: ''
      }
    },
    {
      key: 'Account Balance',
      output: {
        value: '',
        operator: '>=',
        score: ''
      }
    }
  ]);

  const [combinator, setCombinator] = useState('and');
  const [data, setData] = useState(null);

  const handleInputChange = (ruleIndex, key, value) => {
    const newRules = [...rules];
    newRules[ruleIndex].output[key] = value;
    setRules(newRules);
  };

  const deleteRule = (ruleIndex) => {
    const newRules = [...rules];
    newRules.splice(ruleIndex, 1);
    setRules(newRules);
  };

  const handleCombinatorChange = (e) => {
    setCombinator(e.target.value);
  };

  const handleSubmit = (e) => {
    setRules([...rules, { key: 'age', output: { value: '', operator: '>=', score: '' } }]);
    e.preventDefault();
    const formattedOutput = {
      rules: rules.map((rule) => ({
        key: rule.key,
        output: {
          value: Number(rule.output.value),
          operator: rule.output.operator,
          score: Number(rule.output.score)
        }
      })),
     
    };
    
    setData(formattedOutput);


    console.log('Formatted Output:', formattedOutput);
   
   };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
      
        <div className="form-group">
          <label htmlFor="connectorType">Connector Type:</label>
          <select
            className="form-control"
            id="connectorType"
            value={combinator}
            onChange={handleCombinatorChange}
          >
            <option value="and">AND</option>
            <option value="or">OR</option>
          </select>
        </div>
        {rules.map((rule, ruleIndex) => (
          <div key={ruleIndex} className="card mb-3">
            <div className="card-body">
              
              <div className="form-group">
                <label htmlFor="key">Rule Type:</label>
                <select
                  className="form-control"
                  id="key"
                  value={rule.key}
                  onChange={(e) => handleInputChange(ruleIndex, 'key', e.target.value)}
                >
                  <option value="age">Age</option>
                  <option value="credit_score">Credit Score</option>
                  <option value="account_balance">Account Balance</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="operator">Operator:</label>
                <select
                  className="form-control"
                  id="operator"
                  value={rule.output.operator}
                  onChange={(e) => handleInputChange(ruleIndex, 'operator', e.target.value)}
                >
                  <option value="=">=</option>
                  <option value="<">&lt;</option>
                  <option value=">=">≥</option>
                  <option value="<=">≤</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="value">Value:</label>
                <input
                  type="text"
                  className="form-control"
                  value={rule.output.value}
                  onChange={(e) => handleInputChange(ruleIndex, 'value', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="score">Score:</label>
                <input
                  type="text"
                  className="form-control"
                  value={rule.output.score}
                  onChange={(e) => handleInputChange(ruleIndex, 'score', e.target.value)}
                />
              </div>

              <button
                type="button"
                className="btn btn-danger"
                onClick={() => deleteRule(ruleIndex)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        <button type="submit" className="btn btn-success mt-3">
          Submit
        </button>
         {data && (
        <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">Formatted Output</h5>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
          </div>
      )}
      </form>
     
    </div>
  );
};

export default App;
