import clsx from 'clsx';
import React from 'react';

function Title({ title, className }: { title: string; className?: string }) {
  return (
    <div className={clsx("font-bold text-4xl ", className)}>
      {title}
    </div>
  );
}

export default Title;
