const StatCard = ({
  title,
  value,
  icon,
  trend,
  trendValue,
  color = 'emerald',
  onClick,
}) => {
  const colorClasses = {
    emerald: 'bg-emerald-50 text-emerald-500',
    blue: 'bg-blue-50 text-blue-500',
    purple: 'bg-purple-50 text-purple-500',
    orange: 'bg-orange-50 text-orange-500',
    red: 'bg-red-50 text-red-500',
    amber: 'bg-amber-50 text-amber-500',
  };

  const trendColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-gray-500',
  };

  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300
        ${onClick ? 'cursor-pointer' : ''}
      `}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
          {trend && trendValue && (
            <div className={`flex items-center mt-2 ${trendColors[trend]}`}>
              {trend === 'up' && (
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              )}
              {trend === 'down' && (
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              )}
              {trend === 'neutral' && (
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                </svg>
              )}
              <span className="text-sm font-medium">{trendValue}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className={`p-4 rounded-full ${colorClasses[color]}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
