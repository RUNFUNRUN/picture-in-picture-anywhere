import { useStorage } from '@plasmohq/storage/hook';

import '~style.css';

import type { Position } from '~types';

function IndexPopup() {
  const [enable, setEnable] = useStorage<boolean>('enable', (v) =>
    v === undefined ? false : v,
  );
  const [position, setPosition] = useStorage<Position>('position', (v) =>
    v === undefined ? 'right-bottom' : v,
  );

  const positions: Position[] = [
    'left-top',
    'left-center',
    'left-bottom',
    'right-top',
    'right-center',
    'right-bottom',
  ];

  const openLink = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <div className='plasmo-flex plasmo-flex-col plasmo-gap-4 plasmo-p-4 plasmo-w-60 plasmo-bg-white dark:plasmo-bg-black'>
      <header className='plasmo-mb-3'>
        <h1 className='plasmo-text-black dark:plasmo-text-white plasmo-text-2xl plasmo-font-bold'>
          PiP Anywhere
        </h1>
      </header>
      <label className='plasmo-inline-flex plasmo-items-center plasmo-cursor-pointer'>
        <input
          type='checkbox'
          checked={enable}
          onChange={(e) => setEnable(e.target.checked)}
          className='plasmo-sr-only plasmo-peer'
        />
        <div className="plasmo-relative plasmo-w-11 plasmo-h-6 plasmo-bg-gray-50 peer-focus:plasmo-outline-none peer-focus:plasmo-ring-4 peer-focus:plasmo-ring-blue-300 dark:plasmo-peer-focus:ring-blue-800 plasmo-rounded-full plasmo-peer dark:plasmo-bg-gray-700 peer-checked:after:plasmo-translate-x-full rtl:peer-checked:after:-plasmo-translate-x-full peer-checked:after:plasmo-border-white after:plasmo-content-[''] after:plasmo-absolute after:plasmo-top-[2px] after:plasmo-start-[2px] after:plasmo-bg-white after:plasmo-border-gray-300 after:plasmo-border after:plasmo-rounded-full after:plasmo-h-5 after:plasmo-w-5 after:-plasmo-transition-all dark:plasmo-border-gray-600 peer-checked:plasmo-bg-blue-600" />
        <span className='plasmo-ms-3 plasmo-text-sm plasmo-font-medium plasmo-text-gray-900 dark:plasmo-text-gray-50'>
          Enable PiP Button
        </span>
      </label>
      <form>
        <label
          htmlFor='position'
          className='plasmo-block plasmo-mb-2 plasmo-text-sm plasmo-font-medium plasmo-text-gray-900 dark:plasmo-text-white'>
          Select an option
        </label>
        <select
          id='positon'
          value={position}
          onChange={(e) => setPosition(e.target.value as Position)}
          className='plasmo-bg-gray-50 plasmo-border plasmo-border-gray-300 plasmo-text-gray-900 plasmo-text-sm plasmo-rounded-lg plasmo-focus:ring-blue-500 focus:plasmo-border-blue-500 plasmo-block plasmo-w-full plasmo-p-2.5 dark:plasmo-bg-gray-700 dark:plasmo-border-gray-600 dark:plasmo-placeholder-gray-400 dark:plasmo-text-white dark:focus:plasmo-ring-blue-500 dark:focus:plasmo-border-blue-500'>
          {positions.map((position) => (
            <option key={position} value={position}>
              {position}
            </option>
          ))}
        </select>
      </form>
      <footer className='plasmo-mt-3 plasmo-flex'>
        <p className='plasmo-text-gray-900 dark:plasmo-text-gray-50 plasmo-ml-auto plasmo-mr-0'>
          made by{' '}
          <a
            className='plasmo-underline'
            href=''
            onClick={() => openLink('https://runfun.run')}>
            RUNFUNRUN
          </a>{' '}
          |{' '}
          <a
            className='plasmo-underline'
            href=''
            onClick={() => openLink('https://github.com/RUNFUNRUN')}>
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

export default IndexPopup;
