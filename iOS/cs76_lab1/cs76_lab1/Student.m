//
//  Student.m
//  cs76_lab1
//
//  Created by SEB on 5/01/2014.
//  Copyright (c) 2014 SEB. All rights reserved.
//

#import "Student.h"

@implementation Student

- (Student *)init {
    self = [super init];
    self.major = @"Undeclared";
    self.grades = [[NSMutableDictionary alloc] init];

    return self;
}

+ (NSArray *)validMajors {
    NSArray *majors = [[NSArray alloc] initWithObjects:@"Math", @"English", @"Computer Science", @"Undeclared", nil];
    return majors;
}

- (void)setMajor:(NSString *)major {
    NSArray *majors = [Student validMajors];
    
    // check if requested major is valid
    if ([majors containsObject:major])
        _major = [major copy];
    else
        NSLog(@"%@ is not a valid major. %@'s major is still %@", major, self.name, self.major);
}

- (void)addGradeForClass:(int)courseNum withGrade:(int)grade {
    [self.grades setValue:[NSNumber numberWithInt:grade] forKey:[NSString stringWithFormat:@"%d", courseNum]];
}

- (int)age {
    NSCalendar *calendar = [NSCalendar currentCalendar];
    NSDateComponents *components = [calendar components:NSYearCalendarUnit fromDate:self.birthday toDate:[NSDate date] options:0];
    
    return (int)[components year];
}

- (NSString*)name {
    return [NSString stringWithFormat:@"%@ %@", self.first_name, self.last_name];
}

// Override description method
- (NSString *)description {
    int trimmed_year = self.year % 1000 % 100;
    return [NSString stringWithFormat:@"%@(%d) '%02d, %@", self.name, self.age, trimmed_year, self.major];
}

@end
