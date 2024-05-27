// import EStore from 'electron-store';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import icon from '../../../assets/icon.png';
import './index.less';

const Hello = () => (
  <div className="hello-container">
    <div className="Hello">
      <img width="200" alt="icon" src={icon} />
    </div>
    <h1>electron-react-boilerplate</h1>
    <div className="my-4">
      <Link to="/demo">
        <Button type="link">to buttonDemo</Button>
      </Link>
    </div>
    <div className="Hello">
      <a
        href="https://electron-react-boilerplate.js.org/"
        target="_blank"
        rel="noreferrer"
      >
        <button type="button">
          <span role="img" aria-label="books">
            📚
          </span>
          Read our docs
        </button>
      </a>
      <a
        href="https://github.com/sponsors/electron-react-boilerplate"
        target="_blank"
        rel="noreferrer"
      >
        <button type="button">
          <span role="img" aria-label="folded hands">
            🙏
          </span>
          Donate
        </button>
      </a>
    </div>
  </div>
);

export default Hello;
