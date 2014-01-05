//
//  TDLViewController.m
//  cs76_lecture2_test2
//
//  Created by SEB on 5/01/2014.
//  Copyright (c) 2014 SEB. All rights reserved.
//

#import "TDLViewController.h"

@interface TDLViewController ()
    // Private methods
@end

@implementation TDLViewController

- (void) alertView:(UIAlertView *) alertView didDismissWithButtonIndex:(NSInteger)buttonIndex
{
    self.textField.text = nil;
}

- (IBAction)go:(id)sender
{
    [self.textField resignFirstResponder]; // Hide keyboard
    
    NSString *s = [NSString stringWithFormat: @"Hello, %@!!!", self.textField.text];
    
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Finally!"
                                                    message:s
                                                   delegate:self
                                          cancelButtonTitle:@"Thanks!"
                                          otherButtonTitles:nil];
    [alert show];
}

@end
