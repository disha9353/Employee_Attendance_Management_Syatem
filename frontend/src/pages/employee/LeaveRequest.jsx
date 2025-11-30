import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { submitLeaveRequest, getLeaveBalance } from '../../store/slices/leaveSlice';
import { getLeaveTypes } from '../../store/slices/leaveTypeSlice';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import LoadingSpinner from '../../components/LoadingSpinner';
import { format } from 'date-fns';

const LeaveRequest = () => {
  const dispatch = useDispatch();
  const { leaveBalance, loading, error } = useSelector((state) => state.leaves);
  const { leaveTypes } = useSelector((state) => state.leaveTypes);
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    leaveType: '',
    fromDate: '',
    toDate: '',
    reason: '',
    isHalfDay: false,
    halfDayType: 'first-half',
    delegatedTo: '',
    delegationNote: '',
  });
  const [attachment, setAttachment] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(getLeaveBalance());
    dispatch(getLeaveTypes());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append('leaveType', formData.leaveType);
    formDataToSend.append('fromDate', formData.fromDate);
    formDataToSend.append('toDate', formData.toDate);
    formDataToSend.append('reason', formData.reason);
    formDataToSend.append('isHalfDay', formData.isHalfDay);
    if (formData.isHalfDay) {
      formDataToSend.append('halfDayType', formData.halfDayType);
    }
    if (formData.delegatedTo) {
      formDataToSend.append('delegatedTo', formData.delegatedTo);
      formDataToSend.append('delegationNote', formData.delegationNote);
    }
    if (attachment) {
      formDataToSend.append('attachment', attachment);
    }

    const result = await dispatch(submitLeaveRequest(formDataToSend));
    if (submitLeaveRequest.fulfilled.match(result)) {
      alert('Leave request submitted successfully!');
      setFormData({
        leaveType: '',
        fromDate: '',
        toDate: '',
        reason: '',
        isHalfDay: false,
        halfDayType: 'first-half',
        delegatedTo: '',
        delegationNote: '',
      });
      setAttachment(null);
      dispatch(getLeaveBalance());
    }
    setSubmitting(false);
  };

  const selectedLeaveType = leaveTypes.find((lt) => lt._id === formData.leaveType);
  const selectedBalance = leaveBalance.find((b) => b.leaveType._id === formData.leaveType);

  return (
    <Layout role="employee">
      <div className="px-4 sm:px-0">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
        >
          Request Leave
        </motion.h1>

        {error && (
          <Alert
            type="error"
            message={error}
            onClose={() => dispatch({ type: 'leaves/clearError' })}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leave Balance */}
          <div className="lg:col-span-1">
            <Card>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Leave Balance
              </h2>
              {loading ? (
                <LoadingSpinner />
              ) : (
                <div className="space-y-3">
                  {leaveBalance && leaveBalance.length > 0 ? (
                    leaveBalance.map((balance) => (
                      <div
                        key={balance._id || balance.leaveType?._id}
                        className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {balance.leaveType?.name || 'N/A'}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {balance.balance?.toFixed(1) || 0} days
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                          Used: {balance.used?.toFixed(1) || 0} | Pending: {balance.pending?.toFixed(1) || 0}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-500 dark:text-gray-400 mb-2">No leave balance available</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        Leave balances will be created automatically when you first access this page.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>

          {/* Leave Request Form */}
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Leave Request Form
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Leave Type *
                  </label>
                  <select
                    value={formData.leaveType}
                    onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    <option value="">Select Leave Type</option>
                    {leaveTypes.map((lt) => (
                      <option key={lt._id} value={lt._id}>
                        {lt.name} ({lt.code})
                      </option>
                    ))}
                  </select>
                  {selectedBalance && (
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Available: {selectedBalance.balance.toFixed(1)} days
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      From Date *
                    </label>
                    <input
                      type="date"
                      value={formData.fromDate}
                      onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
                      min={format(new Date(), 'yyyy-MM-dd')}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      To Date *
                    </label>
                    <input
                      type="date"
                      value={formData.toDate}
                      onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
                      min={formData.fromDate || format(new Date(), 'yyyy-MM-dd')}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>

                {selectedLeaveType?.allowHalfDay && (
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.isHalfDay}
                        onChange={(e) =>
                          setFormData({ ...formData, isHalfDay: e.target.checked })
                        }
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Half Day
                      </span>
                    </label>
                    {formData.isHalfDay && (
                      <select
                        value={formData.halfDayType}
                        onChange={(e) =>
                          setFormData({ ...formData, halfDayType: e.target.value })
                        }
                        className="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="first-half">First Half</option>
                        <option value="second-half">Second Half</option>
                      </select>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Reason *
                  </label>
                  <textarea
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                {selectedLeaveType?.requiresAttachment && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Attachment * (Medical Certificate, etc.)
                    </label>
                    <input
                      type="file"
                      onChange={(e) => setAttachment(e.target.files[0])}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required={selectedLeaveType.requiresAttachment}
                    />
                  </div>
                )}

                {!selectedLeaveType?.requiresAttachment && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Attachment (Optional)
                    </label>
                    <input
                      type="file"
                      onChange={(e) => setAttachment(e.target.files[0])}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Delegate Tasks To (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.delegatedTo}
                    onChange={(e) => setFormData({ ...formData, delegatedTo: e.target.value })}
                    placeholder="Employee ID or Name"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  />
                  {formData.delegatedTo && (
                    <textarea
                      value={formData.delegationNote}
                      onChange={(e) =>
                        setFormData({ ...formData, delegationNote: e.target.value })
                      }
                      rows={2}
                      placeholder="Delegation notes..."
                      className="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                    />
                  )}
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={submitting || loading}
                    className="flex-1"
                  >
                    {submitting ? <LoadingSpinner size="sm" /> : 'Submit Leave Request'}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LeaveRequest;

