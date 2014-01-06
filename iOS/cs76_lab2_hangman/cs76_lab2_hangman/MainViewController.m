//
//  MainViewController.m
//  cs76_lab2_hangman
//
//  Created by SEB on 6/01/2014.
//  Copyright (c) 2014 SEB. All rights reserved.
//

#import "MainViewController.h"

@interface MainViewController ()

@end

@implementation MainViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
	
    // Demonstrate opening a plist and loading the contents
    NSString *fileWithPath = [[NSBundle mainBundle] pathForResource:@"words" ofType:@"plist"];
    NSMutableArray *words = [[NSMutableArray alloc] initWithContentsOfFile:fileWithPath];
    
    // Log the first work in the list
    NSLog(@"%@", [words objectAtIndex:0]);
    
    // Configure the properties of the UILabel
    self.textLabel.text = @"";
    
    // Configure the properties of the UITextField
    [self.keyInput setHidden:YES];
    
    // Make the software keyboard display itself
    [self.keyInput becomeFirstResponder];
}

- (IBAction)handleKeypress:(id)sender {
    // Check for text and add it to the UILabel
    if ([self.keyInput.text length] > 0) {
        [self.textLabel setText:[self.textLabel.text stringByAppendingString:self.keyInput.text]];
        self.keyInput.text = @"";
    }
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - Flipside View

- (void)flipsideViewControllerDidFinish:(FlipsideViewController *)controller
{
    [self dismissViewControllerAnimated:YES completion:nil];
}

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    if ([[segue identifier] isEqualToString:@"showAlternate"]) {
        [[segue destinationViewController] setDelegate:self];
    }
}
@end
