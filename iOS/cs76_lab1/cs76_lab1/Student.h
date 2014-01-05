//
//  Student.h
//  cs76_lab1
//
//  Created by SEB on 5/01/2014.
//  Copyright (c) 2014 SEB. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface Student : NSObject
@property (nonatomic) NSDate *birthday;
@property (nonatomic) int year;
@property NSString *first_name;
@property NSString *last_name;
@property (nonatomic) NSString *major;
@property (nonatomic) NSMutableDictionary *grades;

// method signatures
+ (NSArray*)validMajors;
- (void)addGradeForClass:(int)courseNum withGrade:(int)grade;
- (int)age;
- (NSString*)name;

@end
