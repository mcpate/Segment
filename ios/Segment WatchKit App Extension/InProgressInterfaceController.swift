//
//  InProgressInterfaceController.swift
//  Segment
//
//  Created by Matthew Pate on 3/1/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation
import WatchKit


class InProgressInterfaceController: WKInterfaceController {
  
  var start: NSDate?
  var segments: [Segment]?
  var currentSegmentId: Int?
  
  @IBOutlet var totalLabel:WKInterfaceLabel!
  @IBOutlet var segmentLabel: WKInterfaceLabel!
  
  override func awake(withContext context: Any?) {
    super.awake(withContext: context)
    
    // Configure interface objects here.
  }
  
  // This method is called when watch view controller is about to be visible to user
  override func willActivate() {
    super.willActivate()
    
    if (segments == nil || start == nil) {
      start = NSDate()
      // todo - get segments from iPhone
      segments = [Segment(id: 0, name: "One", duration: 5.0)]
      currentSegmentId = (segments?[0].id)!
    }
    
    updateTotalLabel();
    updateSegmentLabel();
  }
  
  override func didDeactivate() {
    // This method is called when watch view controller is no longer visible
    super.didDeactivate()
  }
  
  func updateTotalLabel() {
  }
  
  func updateSegmentLabel() {
  }
  
  @IBAction func pausedPressed() {
    // halt timers
  }
  
  @IBAction func stoppedPressed() {
    // show modal
    // potentially reset to start screen
  }
  
  
}
