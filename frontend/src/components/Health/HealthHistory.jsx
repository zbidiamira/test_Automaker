import { useState, useEffect } from 'react';
import { format, subDays, subMonths } from 'date-fns';
import HealthRecordCard from './HealthRecordCard';
import { Loading } from '../Common';

const dateRangeOptions = [
  { label: 'All Time', value: 'all' },
  { label: 'Last 7 Days', value: '7days' },
  { label: 'Last 30 Days', value: '30days' },
  { label: 'Last 3 Months', value: '3months' },
  { label: 'Last Year', value: '1year' },
];

const severityOptions = [
  { label: 'All Severities', value: '' },
  { label: 'Low', value: 'Low' },
  { label: 'Medium', value: 'Medium' },
  { label: 'High', value: 'High' },
  { label: 'Critical', value: 'Critical' },
];

const HealthHistory = ({ 
  records, 
  loading, 
  pagination,
  onPageChange,
  onFilterChange,
  onEdit, 
  onDelete, 
  onView 
}) => {
  const [dateRange, setDateRange] = useState('all');
  const [severity, setSeverity] = useState('');
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' or 'list'

  // Calculate date range
  const getDateRange = (range) => {
    const now = new Date();
    switch (range) {
      case '7days':
        return { startDate: subDays(now, 7).toISOString() };
      case '30days':
        return { startDate: subDays(now, 30).toISOString() };
      case '3months':
        return { startDate: subMonths(now, 3).toISOString() };
      case '1year':
        return { startDate: subMonths(now, 12).toISOString() };
      default:
        return {};
    }
  };

  // Handle filter changes
  useEffect(() => {
    const filters = {
      ...getDateRange(dateRange),
      severity: severity || undefined,
    };
    onFilterChange?.(filters);
  }, [dateRange, severity]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loading size="lg" text="Loading health records..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-3">
            {/* Date Range Filter */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {dateRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Severity Filter */}
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {severityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                viewMode === 'timeline'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📊 Timeline
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📋 List
            </button>
          </div>
        </div>
      </div>

      {/* Records */}
      {records.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Health Records Found</h3>
          <p className="text-gray-500">
            {dateRange !== 'all' || severity
              ? 'Try adjusting your filters to see more records.'
              : 'Start tracking your pet\'s health by adding a new record.'}
          </p>
        </div>
      ) : viewMode === 'timeline' ? (
        // Timeline View
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />

          <div className="space-y-6">
            {records.map((record, index) => (
              <div key={record._id} className="relative flex gap-4">
                {/* Timeline Dot */}
                <div className="hidden md:flex w-12 flex-shrink-0 justify-center">
                  <div className={`w-4 h-4 rounded-full border-4 border-white shadow z-10 ${
                    record.severity === 'Critical' ? 'bg-red-500' :
                    record.severity === 'High' ? 'bg-orange-500' :
                    record.severity === 'Medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`} />
                </div>

                {/* Card */}
                <div className="flex-1">
                  <HealthRecordCard
                    record={record}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onView={onView}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // List View
        <div className="space-y-4">
          {records.map((record) => (
            <HealthRecordCard
              key={record._id}
              record={record}
              onEdit={onEdit}
              onDelete={onDelete}
              onView={onView}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <div className="flex justify-center gap-2 pt-4">
          <button
            onClick={() => onPageChange?.(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            Previous
          </button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: pagination.pages }, (_, i) => i + 1)
              .filter(page => {
                const current = pagination.page;
                return page === 1 || page === pagination.pages || 
                       (page >= current - 1 && page <= current + 1);
              })
              .map((page, index, array) => (
                <span key={page}>
                  {index > 0 && array[index - 1] !== page - 1 && (
                    <span className="px-2 text-gray-400">...</span>
                  )}
                  <button
                    onClick={() => onPageChange?.(page)}
                    className={`w-10 h-10 text-sm rounded-lg transition-colors ${
                      pagination.page === page
                        ? 'bg-emerald-500 text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                </span>
              ))}
          </div>

          <button
            onClick={() => onPageChange?.(pagination.page + 1)}
            disabled={pagination.page === pagination.pages}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default HealthHistory;
