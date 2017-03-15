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
  
    @IBOutlet var totalTimer: WKInterfaceTimer!
    var _totalTimer: Timer?
    var _totalTimerStart: TimeInterval?
  
    @IBOutlet var segmentTimer: WKInterfaceTimer!
    var _segmentTimer: Timer?
    var _segmentTimerStart: TimeInterval?
  
    var segments: [Segment] = [
      Segment(id: 0, name: "One", duration: 15),
      Segment(id: 1, name: "Two", duration: 15),
      Segment(id: 2, name: "Three", duration: 15),
      Segment(id: 3, name: "Four", duration: 15),
      Segment(id: 4, name: "Five", duration: 15)
    ];
    var segmentsIndex: Int = 0;
    var previouslyPaused: Bool = false;
  
    @IBOutlet var pauseButton: WKInterfaceButton!
  
  
    // Configure interface objects here.
    override func awake(withContext context: Any?) {
        super.awake(withContext: context)
    }
    
    // This method is called when watch view controller is about to be visible to user
    override func willActivate() {
        super.willActivate()
        
        // set up the total timer
        let total = NSDate().addingTimeInterval(15*5);
        totalTimer.setDate(total as Date);
        totalTimer.start();
        
        // set up matching timer locally which will fire an event we can track
        _totalTimer = Timer.scheduledTimer(
            timeInterval: 15*5,
            target: self,
            selector: #selector(InProgressInterfaceController.handleTotalTimerTimeout),
            userInfo: nil,
            repeats: false
        )
        _totalTimerStart = NSDate.timeIntervalSinceReferenceDate;
      
        // set up the segment timer
        setCurrentSegment();
    }
  
    // This method is called when watch view controller is no longer visible
    override func didDeactivate() {
        super.didDeactivate()
    }
    
    func setCurrentSegment() {
        if (segmentsIndex < (segments.capacity)) {
            let currentSegment = segments[segmentsIndex]
            
            // set up the segment timer
            let segment = NSDate().addingTimeInterval(currentSegment.duration);
            segmentTimer.setDate(segment as Date);
            segmentTimer.start();
            
            // set up the internal timer
            _segmentTimer = Timer.scheduledTimer(
                timeInterval: currentSegment.duration,
                target: self,
                selector: #selector(InProgressInterfaceController.handleSegmentTimerTimeout),
                userInfo: nil,
                repeats: false
            )
            _segmentTimerStart = NSDate.timeIntervalSinceReferenceDate;
          
        } else {
            // no-op, just ignore this for now cause we're assuming the total timer is about to fire
        }
    }
    
    func handleSegmentTimerTimeout() {
        WKInterfaceDevice.current().play(.success);
        segmentsIndex = segmentsIndex + 1;
        setCurrentSegment();
    }
    
    func handleTotalTimerTimeout() {
        print("timer timeout!");
    }
    
    @IBAction func pausedPressed() {
        if (previouslyPaused) {
            previouslyPaused = false;
            pauseButton.setTitle("Pause");
            totalTimer.start();
            _totalTimer?.fire();
            segmentTimer.start();
            _segmentTimer?.fire();
        } else {
            previouslyPaused = true;
            pauseButton.setTitle("Resume");
            totalTimer.stop();
            _totalTimer?.invalidate();
            segmentTimer.stop();
            _segmentTimer?.invalidate();
        }
    }
    
    @IBAction func stoppedPressed() {
        // show modal
        // potentially reset to start screen
    }
}
