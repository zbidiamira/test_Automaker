import { formatDistanceToNow } from 'date-fns';

// Format date to "time ago" format
const formatTimeAgo = (dateString) => {
  try {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  } catch {
    return 'Recently';
  }
};

// Activity type icons and colors
const activityConfig = {
  animal_added: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
    color: 'bg-emerald-100 text-emerald-600',
    label: 'New animal registered',
  },
  health_record: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: 'bg-blue-100 text-blue-600',
    label: 'Health record added',
  },
  diagnosis: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: 'bg-purple-100 text-purple-600',
    label: 'AI diagnosis performed',
  },
  animal_updated: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    color: 'bg-amber-100 text-amber-600',
    label: 'Animal profile updated',
  },
};

const RecentActivity = ({ activities = [] }) => {
  if (activities.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="text-center py-8">
          <span className="text-4xl mb-4 block">📭</span>
          <p className="text-gray-500">No recent activity yet.</p>
          <p className="text-sm text-gray-400 mt-1">Add your first animal to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const config = activityConfig[activity.type] || activityConfig.animal_added;
          return (
            <div
              key={activity.id || index}
              className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {/* Icon */}
              <div className={`p-2 rounded-full ${config.color}`}>
                {config.icon}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800">
                  {activity.title || config.label}
                </p>
                {activity.description && (
                  <p className="text-sm text-gray-500 truncate">{activity.description}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  {formatTimeAgo(activity.createdAt)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      {activities.length > 0 && (
        <button className="w-full mt-4 text-center text-sm text-emerald-600 hover:text-emerald-700 font-medium">
          View all activity
        </button>
      )}
    </div>
  );
};

export default RecentActivity;
