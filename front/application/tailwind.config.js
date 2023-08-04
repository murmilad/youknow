module.exports = {
  theme: {
    extend: {
      keyframes: {
        'progress-indeterminate': {
          from: { left: '-75%', width: '75%' },
          to: { left: '100%', width: '75%' },
        }
      },
      animation: {
        progress: 'progress-indeterminate 2s linear infinite'
      },
    },
  },
}