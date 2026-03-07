/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: profile
 * Interface for Profile
 */
export interface Profile {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  role?: string;
  /** @wixFieldType text */
  educationYear?: string;
  /** @wixFieldType text */
  university?: string;
  /** @wixFieldType text */
  major?: string;
  /** @wixFieldType text */
  biography?: string;
}


/**
 * Collection ID: showreels
 * Interface for Showreels
 */
export interface Showreels {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType url */
  videoUrl?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  thumbnailImage?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  category?: string;
}
