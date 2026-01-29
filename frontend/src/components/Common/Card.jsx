const Card = ({
  children,
  title,
  subtitle,
  footer,
  headerAction,
  className = '',
  noPadding = false,
  hoverable = false,
  bordered = false,
}) => {
  return (
    <div
      className={`
        bg-white rounded-xl shadow-md overflow-hidden
        ${hoverable ? 'hover:shadow-lg transition-shadow duration-300 cursor-pointer' : ''}
        ${bordered ? 'border border-gray-200' : ''}
        ${className}
      `}
    >
      {/* Header */}
      {(title || headerAction) && (
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
              )}
              {subtitle && (
                <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
              )}
            </div>
            {headerAction && <div>{headerAction}</div>}
          </div>
        </div>
      )}

      {/* Body */}
      <div className={noPadding ? '' : 'px-6 py-4'}>
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          {footer}
        </div>
      )}
    </div>
  );
};

// Stat Card for Dashboard
export const StatCard = ({
  title,
  value,
  icon,
  trend,
  trendValue,
  color = 'emerald',
  className = '',
}) => {
  const colorClasses = {
    emerald: 'bg-emerald-50 text-emerald-500',
    blue: 'bg-blue-50 text-blue-500',
    purple: 'bg-purple-50 text-purple-500',
    orange: 'bg-orange-50 text-orange-500',
    red: 'bg-red-50 text-red-500',
  };

  const trendColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-gray-500',
  };

  return (
    <div
      className={`
        bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300
        ${className}
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

// Info Card for displaying information
export const InfoCard = ({
  icon,
  title,
  description,
  action,
  color = 'emerald',
}) => {
  const colorClasses = {
    emerald: 'bg-emerald-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className={`${colorClasses[color]} h-2`} />
      <div className="p-6">
        <div className="flex items-start space-x-4">
          {icon && (
            <div className={`p-3 rounded-lg bg-opacity-10 ${colorClasses[color]} bg-current`}>
              {icon}
            </div>
          )}
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
            <p className="text-gray-500 mt-1">{description}</p>
            {action && <div className="mt-4">{action}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
