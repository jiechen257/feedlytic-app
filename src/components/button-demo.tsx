import { Button } from 'antd';
import { Link, useBeforeUnload, useNavigate } from 'react-router-dom';
import React from 'react';
import { useBearStore } from '../store';

function ButtonDemo() {
  const bears = useBearStore((state) => state.bears);
  const increasePopulation = useBearStore((state) => state.increasePopulation);
  const removeAllBears = useBearStore((state) => state.removeAllBears);

  const navigate = useNavigate();

  const handleBeforeNavigate = (callback: Function) => {
    // Your callback function logic here
    window.electron.store.set('bears', bears);
    console.log('Callback function executed');
    removeAllBears();
    callback();
  };

  const handleNavigation = (path: string) => {
    handleBeforeNavigate(() => {
      navigate(path);
    });
  };

  return (
    <div className="flex flex-col">
      <p className="text-2xl font-bold">Bears</p>
      <div className="flex justify-center items-center bg-gray-800 text-xl font-bold rounded">
        zustand: {bears}
      </div>
      <div className="flex justify-center items-center my-4 bg-gray-800 text-xl font-bold rounded">
        electron-store: {window.electron.store.get('bears')}
      </div>
      <div className="flex mt-4">
        <Button onClick={increasePopulation} className="mr-4">
          Increment
        </Button>
        <Button onClick={removeAllBears}>remove all</Button>
      </div>
      {/* <Link className="my-4" to="/"> */}
      {/* </Link> */}
      <Button
        type="link"
        className="mt-4"
        onClick={() => handleNavigation('/')}
      >
        to home
      </Button>
    </div>
  );
}

export default ButtonDemo;
