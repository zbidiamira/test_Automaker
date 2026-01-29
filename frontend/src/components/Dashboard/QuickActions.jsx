import { Link } from 'react-router-dom';

const quickActionsList = [
  {
    id: 'add-animal',
    label: 'Add New Animal',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
    path: '/animals',
    color: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600',
    state: { openAddModal: true },
  },
  {
    id: 'ai-diagnosis',
    label: 'AI Diagnosis',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    path: '/diagnosis',
    color: 'bg-blue-50 hover:bg-blue-100 text-blue-600',
  },
  {
    id: 'view-animals',
    label: 'View Animals',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    path: '/animals',
    color: 'bg-purple-50 hover:bg-purple-100 text-purple-600',
  },
  {
    id: 'health-records',
    label: 'Health Records',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    path: '/health-records',
    color: 'bg-amber-50 hover:bg-amber-100 text-amber-600',
  },
];

const QuickActions = ({ customActions }) => {
  const actions = customActions || quickActionsList;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action) => (
          <Link
            key={action.id}
            to={action.path}
            state={action.state}
            className={`
              flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200
              ${action.color}
            `}
          >
            <div className="mb-2">{action.icon}</div>
            <span className="text-sm font-medium text-center">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
