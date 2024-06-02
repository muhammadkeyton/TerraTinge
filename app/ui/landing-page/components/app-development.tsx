'use client';

import { useRef, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function GifImage({ gif, altText }: { gif: string; altText: string }) {
  return <Image priority={gif === '/submit.gif' ? true : false} unoptimized src={gif} width={250} height={250} alt={`${altText} image`} />;
}

const stepsData = [
  {
    step: 'Step 1',
    gif: '/submit.gif',
    heading: 'Project Submission',
    text: "Start by creating an account with us. Once that's done, you can upload a detailed description of your project for our team to review. This will help us understand your needs and expectations.",
  },
  {
    step: 'Step 2',
    gif: '/discussion.gif',
    heading: 'Design Discussion',
    text: "After reviewing your project, we'll schedule a virtual meeting. During this meeting, we'll discuss potential designs and the features that should be included in your Minimum Viable Product (MVP).",
  },
  {
    step: 'Step 3',
    gif: '/payment.gif',
    heading: 'Payment and Review',
    text: 'Once the project plan is finalized, you can review it within your account. If everything looks good, you can proceed to make an initial payment, which is one-third of the total project cost.',
  },
  {
    step: 'Step 4',
    gif: '/freedom.gif',
    heading: 'Full Access and Freedom',
    text: "Upon completion of the project, we'll provide you with full access to your application. This includes the source code and hosting services, giving you the freedom to engage other developers if you wish.",
  },
];

interface StepPropTypes {
  step: string;
  onClick: () => void;
  currentStep: number;
  index: number;
}

function Step({ step, onClick, currentStep, index }: StepPropTypes) {
  const selected = currentStep == index;
  return (
    <h3 onClick={onClick} className={`cursor-pointer ${selected ? 'underline decoration-indigo-700 font-semibold leading-4' : ''}  underline-offset-8 dark:text-white`}>
      {step}
    </h3>
  );
}

export default function AppDevelopment() {
  const [currentStep, setStep] = useState(0);

  const leftBtnRef = useRef(null);
  const rightBtnRef = useRef(null);

  const changeStep = (index: number) => {
    setStep(index);
  };

  const changeStepWithKeys = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      if (currentStep === 3) return;
      setStep((index) => index + 1);
      if (currentStep + 1 === 3) (leftBtnRef.current as any).focus();
    }
    if (e.key === 'ArrowLeft') {
      if (currentStep === 0) return;
      setStep((index) => index - 1);
      if (currentStep - 1 === 0) (rightBtnRef.current as any).focus();
    }
  };

  return (
    <div id='section1' className='flex items-center justify-center md:justify-between my-10 xl:mx-24'>
      <IconButton
        className={clsx('hidden', {
          'md:block md:visible': currentStep > 0,
          'md:block md:invisible': currentStep === 0,
        })}
        onClick={() => changeStep(currentStep - 1)}
        onKeyDown={(e: any) => changeStepWithKeys(e)}
        ref={leftBtnRef}
      >
        <ArrowBackIcon className='text-4xl dark:text-white' />
      </IconButton>

      <div className='flex flex-col md:flex-row items-center lg:space-x-12'>
        <div className='flex flex-col space-y-6'>
          <h1 className='dark:text-white text-2xl max-w-md font-medium '>Your app development process with our Team of Engineers is super easy!</h1>

          <div className='flex flex-wrap space-x-4'>
            {stepsData.map((data, i) => {
              return <Step key={i} step={data.step} index={i} currentStep={currentStep} onClick={() => changeStep(i)} />;
            })}
          </div>

          <div>
            <h3 className='font-bold text-xl mb-4 dark:text-white'>{stepsData[currentStep].heading}</h3>
            <p className='max-w-md text-gray-700 font-semibold dark:text-gray-300'>{stepsData[currentStep].text}</p>
          </div>
        </div>

        <GifImage gif={stepsData[currentStep].gif} altText={stepsData[currentStep].heading} />
      </div>

      <IconButton
        className={clsx('hidden', {
          'md:block md:invisible': currentStep === 3,
          'md:block md:visible': currentStep < 3,
        })}
        onClick={() => changeStep(currentStep + 1)}
        onKeyDown={(e: any) => changeStepWithKeys(e)}
        ref={rightBtnRef}
      >
        <ArrowForwardIcon className='text-4xl dark:text-white' />
      </IconButton>
    </div>
  );
}
