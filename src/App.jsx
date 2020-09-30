import React from 'react';
import ReactDOM from 'react-dom';

// Import base styles (Bootstrap and Shards)
import 'bootstrap/dist/css/bootstrap.css';
import 'shards-ui/dist/css/shards.css';

import './index.css';

import Chat from './Chat';

const App = () => <Chat />;

ReactDOM.render(<App />, document.getElementById('app'));
