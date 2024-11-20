import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import React from 'react';
import { FaBell } from 'react-icons/fa';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { MdPushPin } from "react-icons/md";

// Define notification types
type NotificationType = 'alert' | 'message';

// Define the structure of a notification
interface Notification {
    type: NotificationType;
    message: string;
}

// Define the ICON object with types
const ICON: Record<NotificationType, JSX.Element> = {
    alert: <MdPushPin className="text-red-500 text-lg" />,
    message: <MdPushPin className="text-blue-500 text-lg" />,
};

const NotificationPanel: React.FC = () => {
    // Example notifications
    const notifications: Notification[] = [
        { type: 'alert', message: 'System maintenance scheduled at 2 AM.' },
        { type: 'message', message: 'You have a new message from John.' },
        { type: 'alert', message: 'Server CPU usage is high.' },
    ];

    // Notification count
    const notificationCount = notifications.length;

    return (
        <Popover className="relative">
            {/* Notification Bell Icon */}
            <PopoverButton className="inline-block items-center outline-none">
                <div className="h-10 w-10 flex items-center justify-center text-gray-500 dark:text-white relative">
                    <IoIosNotificationsOutline className="text-2xl" />
                    {notificationCount > 0 && (
                        <span className="absolute text-center top-0 right-0 text-sm font-semibold w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center">
                            {notificationCount}
                        </span>
                    )}
                </div>
            </PopoverButton>

            {/* Notification Dropdown */}
            <PopoverPanel className="absolute z-10 mt-2 right-0 w-80 bg-white shadow-lg rounded-md overflow-hidden">
                <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-700 mb-2">Notifications</h3>
                    {notifications.length > 0 ? (
                        <ul className="space-y-2 max-h-60 overflow-y-auto">
                            {notifications.map((notification, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-2 p-2 bg-gray-100 hover:bg-gray-200 rounded-md"
                                >
                                    <div>{ICON[notification.type]}</div>
                                    <span className="text-sm text-gray-700">{notification.message}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500">No notifications</p>
                    )}
                </div>
            </PopoverPanel>
        </Popover>
    );
};

export default NotificationPanel;
