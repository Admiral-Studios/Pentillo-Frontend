import dashIcon from '../../assets/icons/dashboard-icon.svg'
import tempIcon from '../../assets/icons/templates-icon.svg'
import transactionsIcon from '../../assets/icons/transactions-icon.svg'
import contactsIcon from '../../assets/icons/contacts-icon.svg'
import teamIcon from '../../assets/icons/team-icon.svg'
import tasksIcon from '../../assets/icons/tasks-icon.svg'
import DashboardIcon from '@/components/UI/icons/DashboardIcon'
import TemplatesIcon from '@/components/UI/icons/TemplatesIcon'
import TransactionsIcon from '@/components/UI/icons/TransactionsIcon'
import ContactsIcon from '@/components/UI/icons/ContactsIcon'
import TeamsIcon from '@/components/UI/icons/TeamsIcon'
import TasksIcon from '@/components/UI/icons/TasksIcon'

export const sidebarConstants = [
  {
    id: 1,
    name: 'Dashboard',
    src: dashIcon,
    href: '/dashboard',
    icon: DashboardIcon,
  },
  {
    id: 2,
    name: 'Templates',
    src: tempIcon,
    href: '/templates',
    icon: TemplatesIcon,
  },
  {
    id: 3,
    name: 'Transactions',
    src: transactionsIcon,
    href: '/transactions',
    icon: TransactionsIcon,
  },
  {
    id: 4,
    name: 'Contacts',
    src: contactsIcon,
    href: '/contacts',
    icon: ContactsIcon,
  },
  {
    id: 5,
    name: 'Team',
    src: teamIcon,
    href: '/team',
    icon: TeamsIcon,
  },
  {
    id: 6,
    name: 'Tasks',
    src: tasksIcon,
    href: '/tasks',
    icon: TasksIcon,
  },
]
