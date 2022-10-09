import { useRouter } from 'next/router';
import React from 'react';

const MessageRoom = () => {
  const { query } = useRouter();
  // const { data } = useSeeRoom(+(query.mr as string));
  // const { data } = useRoomUpdatesSubscription(+(query.mr as string));
  // console.log(data);
  return (
    <div className='h-[600px] w-96 overflow-y-auto rounded-md bg-white'>
      <span>message</span>
    </div>
  );
};

export default MessageRoom;
