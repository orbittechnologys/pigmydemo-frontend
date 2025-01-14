import React from 'react';

import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';
import * as AiIcons from 'react-icons/ai';


export const SidebarData = [

  {
    title: 'Daily Deposit',
    path: '/dashboard',
    icon: <RiIcons.RiBillFill />,
    cName: 'nav-text'
  },
  {
    title: 'All Admin',
    path: '/allAdmin',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'All Agent',
    path: '/agent',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Customers',
    path: '/customer',
    icon: <IoIcons.IoIosPersonAdd />,
    cName: 'nav-text'
  },
  {
    title: 'Withdrawal',
    path: '/amountdect',
    icon: <FaIcons.FaRegCreditCard />,
    cName: 'nav-text'
  },
  {
    title: 'Deposit',
    path: '/deposite',
    icon: <AiIcons.AiFillBank />,
    cName: 'nav-text'
  },
  {
    title: 'Loan',
    path: '/loandetails',
    icon: <GiIcons.GiMoneyStack /> ,
    cName: 'nav-text'
  },
  {
    title: 'Acc Transaction',
    path: '/allacctransaction',
    icon: <GiIcons.GiMoneyStack /> ,
    cName: 'nav-text'
  },
  {
    title: 'Reports',
    path: '/csvfile',
    icon: <FaIcons.FaFileCsv /> ,
    cName: 'nav-text'
  },
  {
    title: 'Daily Profit',
    path: '/commission',
    icon: <GiIcons.GiMoneyStack /> ,
    cName: 'nav-text'
  },

];