interface SubmissionsChartProps {
    dailySubmissions: Array<{
      date: string;
      count: number;
    }>;
  }
  
  export default function SubmissionsChart({ dailySubmissions }: SubmissionsChartProps) {
    const maxCount = Math.max(...dailySubmissions.map(d => d.count), 1);
    
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Submissions Trend</h3>
        
        {dailySubmissions.length > 0 ? (
          <div className="space-y-4">
            {/* Simple Bar Chart */}
            <div className="space-y-2">
              {dailySubmissions.map((day, index) => {
                const width = (day.count / maxCount) * 100;
                const date = new Date(day.date).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                });
                
                return (
                  <div key={day.date} className="flex items-center space-x-3">
                    <div className="w-16 text-sm text-gray-600">{date}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                        style={{ width: `${Math.max(width, 5)}%` }}
                      >
                        {day.count > 0 && (
                          <span className="text-white text-xs font-medium">{day.count}</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Summary Stats */}
            <div className="pt-4 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {dailySubmissions.reduce((sum, day) => sum + day.count, 0)}
                  </p>
                  <p className="text-sm text-gray-500">Total (7 days)</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(dailySubmissions.reduce((sum, day) => sum + day.count, 0) / 7)}
                  </p>
                  <p className="text-sm text-gray-500">Daily Average</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{maxCount}</p>
                  <p className="text-sm text-gray-500">Peak Day</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">📈</div>
            <p className="text-gray-500">No submission data yet</p>
          </div>
        )}
      </div>
    );
  }
  