import { Button, Switch } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useBearStore } from '../stores';

const ButtonDemo = () => {
  const bears = useBearStore((state) => state.bears);
  const increasePopulation = useBearStore((state) => state.increasePopulation);
  const removeAllBears = useBearStore((state) => state.removeAllBears);

  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const handleBeforeNavigate = (callback: Function) => {
    // Your callback function logic here
    window.electron.store.set('bears', bears);
    removeAllBears();
    callback();
  };

  const handleNavigation = (path: string) => {
    handleBeforeNavigate(() => {
      navigate(path);
    });
  };
  const switchLanguage = (val: boolean) => {
    i18n.changeLanguage(val ? 'zh' : 'en');
    console.log('change language');
  };

  console.log('i18-jie', i18n.languages);

  return (
    <div className="flex flex-col">
      <p className="text-2xl font-bold">Bears</p>
      <div className="flex justify-center items-center bg-gray-800 text-xl font-bold rounded">
        zustand: {bears}
      </div>
      <div className="flex justify-center items-center my-4 bg-gray-800 text-xl font-bold rounded">
        electron-store: {window.electron.store.get('bears')}
      </div>
      <div className="my-4">
        <Switch defaultChecked onChange={switchLanguage} />
      </div>
      <div className="flex mt-4">
        <Button type="primary" onClick={increasePopulation} className="mr-4">
          {t('Increment')}
        </Button>
        <Button onClick={removeAllBears}>{t('Remove All')}</Button>
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
};

export default ButtonDemo;
