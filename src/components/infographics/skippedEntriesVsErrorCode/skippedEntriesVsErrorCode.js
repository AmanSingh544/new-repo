import React from 'react'
import { Bar } from 'react-chartjs-2'

const skippedEntriesVsErrorCode = () => {
  return (
    <div>
      <Bar 
        type={"skippedEntriesVsErrorCode"}
        barData = {
            [10, 10, 46, 1808, 6]
        }
        labels = {["R1", "R5", "R6", "R7", "R8"]}
        cutout={
            window.screen.width > 1500
              ? 80
              : window.screen.width > 1280 && window.screen.width < 1500
                ? 75
                : 65
          }
      />
    </div>
  )
}

export default skippedEntriesVsErrorCode
