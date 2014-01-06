//
//  MainViewController.h
//  cs76_lab2_hangman
//
//  Created by SEB on 6/01/2014.
//  Copyright (c) 2014 SEB. All rights reserved.
//

#import "FlipsideViewController.h"

@interface MainViewController : UIViewController <FlipsideViewControllerDelegate>

@property (weak, nonatomic) IBOutlet UILabel *textLabel;
@property (weak, nonatomic) IBOutlet UITextField *keyInput;
- (IBAction)handleKeypress:(id)sender;

@end
