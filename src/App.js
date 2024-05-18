import React from 'react';
import GenerateContent from './component/GenerateContent'; // Assuming GenerateContent.jsx is in the same directory
import Header from './component/Header';

function App() {
  return (
    
    <div className="App">
      <Header />
      {/* Header or other components in your app */}
      <GenerateContent className='receipt'/>
      {/* Footer or other components in your app */}
    </div>
  );
}

export default App;

