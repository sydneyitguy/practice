//
//  TDLViewController.h
//  cs76_lecture2_test2
//
//  Created by SEB on 5/01/2014.
//  Copyright (c) 2014 SEB. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface TDLViewController : UIViewController <UIAlertViewDelegate>

@property (strong, nonatomic) IBOutlet UITextField *textField;

- (void) alertView:(UIAlertView *) alertView didDismissWithButtonIndex:(NSInteger)buttonIndex;
- (IBAction)go:(id)sender;

@end
