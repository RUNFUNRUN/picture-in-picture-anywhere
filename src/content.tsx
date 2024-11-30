import cssText from 'data-text:~style.css';
import { PictureInPicture2 } from 'lucide-react';
import type { PlasmoCSConfig } from 'plasmo';

import { useStorage } from '@plasmohq/storage/hook';

import { openPip } from '~features/openPip';
import type { Position } from '~types';

export const config: PlasmoCSConfig = {
  matches: ['<all_urls>'],
};

export const getStyle = () => {
  const style = document.createElement('style');
  style.textContent = cssText;
  return style;
};

const PlasmoOverlay = () => {
  const [enable] = useStorage<boolean>('enable');
  const [position] = useStorage<Position>('position');

  if (!enable) return null;

  let positionClass: string;
  switch (position) {
    case 'left-top':
      positionClass = 'plasmo-left-3 plasmo-top-3';
      break;
    case 'left-center':
      positionClass = 'plasmo-left-3 plasmo-top-1/2';
      break;
    case 'left-bottom':
      positionClass = 'plasmo-left-3 plasmo-bottom-3';
      break;
    case 'right-top':
      positionClass = 'plasmo-right-3 plasmo-top-3';
      break;
    case 'right-center':
      positionClass = 'plasmo-right-3 plasmo-top-1/2';
      break;
    default: //'right-bottom' is default
      positionClass = 'plasmo-right-3 plasmo-bottom-3';
  }

  return (
    <div className={`plasmo-z-50 plasmo-flex plasmo-fixed ${positionClass}`}>
      <button
        type='button'
        className='plasmo-p-2 plasmo-backdrop-blur-sm plasmo-bg-white/10 hover:plasmo-bg-white/20 plasmo-rounded-lg plasmo-shadow-lg'
        onClick={openPip}>
        <PictureInPicture2 />
      </button>
    </div>
  );
};

export default PlasmoOverlay;
